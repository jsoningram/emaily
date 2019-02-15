const mongoose     = require( 'mongoose' )
const config       = require( '../config' )
const stripe       = require( 'stripe' )( config.stripe.secretKey )

// Middlewares
const requireLogin = require( '../middlewares/requireLogin' )

// Model Class
const User = mongoose.model( 'users' )

module.exports = ( app ) => {
	// Route handler
	app.post( '/api/stripe', requireLogin, async ( req, res ) => {
		const {
			userId,
			amount,
			description,
			currency,
			credits,
			stripeResponse
		} = req.body

		try {
			const charge = await stripe.charges.create({
				amount,
				currency,
				description,
				source: stripeResponse.id
			})

			req.user.payments.push({
				email: stripeResponse.email,
				chargeId: charge.id,
				chargeDate: charge.created,
				currency,
				amount
			})

			User.findOneAndUpdate(
				{ googleId: userId },
				{
					payments: req.user.payments,
					credits: credits + req.user.credits
				},
				{ new: true, upsert: false },
				( err, user ) => {
					if ( user ) {
						res.send( user )
					}
				}
			)
		} catch ( err ) {
			// TODO handle sending back error
			console.log( 'billing.error', err.message )
		}
	})
}
