module.exports = ( app ) => {
	// Route handler
	app.get( '/api/current_user', ( req, res ) => {
		console.log( 'current_user', req.user )

		res.send( req.user )
	})

	app.get( '/api/logout', ( req, res ) => {
		req.logout()

		console.log( 'logout | User:', req.user )

		res.send( req.user )
	})
}
