const express       = require( 'express' )
const mongoose      = require( 'mongoose' )
const cookieSession = require( 'cookie-session' )
const passport      = require( 'passport' )
const config        = require( './config' )
const PORT          = process.env.PORT || 5000
const bodyParser    = require( 'body-parser' )

require( './models/User' )
require( './models/Survey' )
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
// For POST requests
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

// cookieSession assigns session ID to req (req.session)
app.use( cookieSession({
	name  : 'session', // Default name
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys  : [ config.cookieKey ]
}))

app.use( passport.initialize() )
app.use( passport.session() )

// returns a function that immediately gets called
// with app as the argument
require( './routes/auth/google' )( app )
require( './routes/user' )( app )
require( './routes/billing' )( app )
require( './routes/survey' )( app )

if ( 'production' === process.env.NODE_ENV ) {
	// Express will serve up production assets (css/main.js)
	app.use( express.static( 'client/build' ) )

	// Express will serve index.html if route is not recognized
	const path = require( 'path' )

	app.get( '*', ( req, res ) => {
		res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) )
	})
}

app.listen( PORT )

console.log( `Express listening on port ${ PORT }` )
