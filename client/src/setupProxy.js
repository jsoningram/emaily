const env    = process.env.NODE_ENV || 'development'
const config = require( './config' )[ env ]
const common = require( './config' )['common']
const proxy  = require( 'http-proxy-middleware' )
     
module.exports = function( app ) {
	app.use( proxy(  common.routes.googleAuth, { target: config.localProxyServer.uri } ) )
	app.use( proxy(  '/api/*', { target: config.localProxyServer.uri } ) )
}
