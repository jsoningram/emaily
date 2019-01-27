const passport       = require( 'passport' )
const mongoose       = require( 'mongoose' )
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy
const config         = require( '../config' )

// Model Class
const User = mongoose.model( 'users' )

passport.serializeUser( ( user, done ) => {
	console.log( 'Serialize User', user.id )

	done( null, user.id )
})

passport.deserializeUser( ( id, done ) => {
	User.findById( id ).then( ( user ) => {
		console.log( 'Deserialize User', user )

		done( null, user )
	}).catch( ( err ) => {
		console.log( 'Deserialize Error', err.message )
	})
})

passport.use(
	new GoogleStrategy(
		config.googleStrategy,
		( accessToken, refreshToken, profile, done ) => {
			const { id, name: { familyName }, name: { givenName } } = profile

			console.log( 'Google Profile Received', id, givenName, familyName )
			
			User.findOne({
				googleId: id
			}).exec( ( err, existingUser ) => {
				console.log( 'Mongo Response', err, existingUser )

				if ( existingUser ) {
					console.log( 'User already in DB' )
					
					done( null, existingUser )
				} else {
					// Create new Mongoose model instance represting a single
					// record from the collection
					new User({
						googleId : id,
						firstName: givenName,
						lastName : familyName
					}).save().then( ( user ) => {
						console.log( 'New user added', user )

						done( null, user )
					})
				}
			})
		}
	)
)
