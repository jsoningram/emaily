const express = require( 'express' )
const app     = express()
const PORT    = process.env.PORT || 5000

// Route handler, listen for GET request
app.get( '/', ( req, res ) => {
	res.send( { bye: 'buddy' } )
})

app.listen( PORT )

console.log( `Express listening on port ${ PORT }` )
