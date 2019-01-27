const express       = require( 'express' )
const mongoose      = require( 'mongoose' )
const cookieSession = require( 'cookie-session' )
const passport      = require( 'passport' )
const config        = require( './config' )
const PORT          = process.env.PORT || 5000

require( './models/User' )
require( './services/passport' )

mongoose.connect( config.mongoDB.uri, {
	auth: {
		user    : config.mongoDB.user,
		password: config.mongoDB.password
	},
	useNewUrlParser: true
})

const db = mongoose.connection

db.on( 'error', console.error.bind( console, 'connection error' ) )

db.once( 'open', () => {
	console.log( 'connected to', db.name )
})

const app = express()

// Middlewares
// cookieSession assigns session ID to req (req.session)
app.use( cookieSession({
	name  : 'session', // Default name
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys  : config.cookieKeys
}))

app.use( passport.initialize() )
app.use( passport.session() )

require( './routes/auth/google' )( app )
require( './routes/user' )( app )

app.listen( PORT )

console.log( `Express listening on port ${ PORT }` )
