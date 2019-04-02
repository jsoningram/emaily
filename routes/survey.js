const mongoose       = require( 'mongoose' )
const Mailer         = require( '../services/mailer' )
const surveyTemplate = require( '../services/templates/email/survey' )

// Middlewares
const requireLogin = require( '../middlewares/requireLogin' )
const checkCredits = require( '../middlewares/checkCredits' )

// Model Class
const Survey = mongoose.model( 'surveys' )
const User   = mongoose.model( 'users' )

module.exports = ( app ) => {
	app.get( '/api/surveys/', requireLogin, async ( req, res ) => {
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ recipients: 0 })

		res.send( surveys )
	})

	app.get( '/api/surveys/:surveyId/:choice', ( req, res ) => {
		res.send( 'Thanks for your feedback' )
	})

	app.post( '/api/surveys', requireLogin, checkCredits, ( req, res ) => {
		const { title, subject, body, recipients, userId } = req.body

		const date = new Date()

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split( ',' ).map( email => ( { email: email.trim() } ) ),
			_user: req.user.id,
			dateSent: date 
		})

		//const mailer = new Mailer( survey, surveyTemplate( survey ) )
		const mailer = new Mailer( survey )

		req.user.surveys.push({
			date   : date,
			_survey: survey._id 
		})

		mailer.send().then( ( response ) => {
			User.findOneAndUpdate(
				{ googleId: userId },
				{
					credits: req.user.credits - recipients.split( ',' ).length,
					surveys: req.user.surveys
				},
				{ new: true, upsert: false },
				( err, user ) => {
					if ( user ) {
						survey.save()
						res.send( user )
					}
				}
			)
		})
	})

	app.post( '/api/surveys/webhooks', ( req, res ) => {
		let surveyId, choice, email, clicks = []

		req.body.map( ( { email, event, url } ) => {
			if ( 'click' === event ) {
				surveyId = url.split( '/' )[5]
				choice   = url.split( '/' )[6]
				
				clicks.push({
					surveyId,
					email,
					choice
				})
			}
			
			return clicks
		})

		clicks.length && clicks.map( ( { surveyId, email, choice } ) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: {
							email: email,
							responded: false
						}
					}
				},
				{
					$inc: { [ choice ]: 1 },
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				},
			).exec().then( console.log )

			return
		})

		res.send({ success: true })
	})
}
