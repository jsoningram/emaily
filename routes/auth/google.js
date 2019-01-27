const passport = require( 'passport' )

module.exports = ( app ) => {
	// Route handler
	app.get( '/auth/google', passport.authenticate( 'google', {
		scope: [
			'profile',
			'email'
		]
	}))

	app.get( '/auth/google/callback', passport.authenticate( 'google', {
		successRedirect: '/api/current_user',
		failureRedirect: '/auth/google'
	}))
}
