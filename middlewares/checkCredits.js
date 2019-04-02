module.exports = ( req, res, next ) => {
	const { recipients } = req.body

	if ( req.user.credits < recipients.split( ',' ).length ) {
		return res.status( 402 ).send({ error: 'You must purchase more credits' } )
	}

	next()
}
