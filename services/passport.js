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
		async ( accessToken, refreshToken, profile, done ) => {
			const { id, name: { familyName }, name: { givenName } } = profile

			const existingUser = await User.findOne({ googleId: id })
			
			if ( existingUser ) {
				return done( null, existingUser )
			}

			// Create new Mongoose model instance represting a single
			// record from the collection
			const user = await new User({
				googleId : id,
				firstName: givenName,
				lastName : familyName
			}).save()
			
			done( null, user )
		}
	)
)
