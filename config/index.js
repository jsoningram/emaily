const env  = process.env.NODE_ENV || 'development'
const keys = 'production' !== env ? require( './keys' )[ env ] : {}

module.exports = {
	googleStrategy: {
		clientID    : process.env.GoogleClientID || keys.GoogleClientID,
		clientSecret: process.env.GoogleClientSecret || keys.GoogleClientSecret,
		callbackURL : process.env.GoogleAuthCallback || keys.GoogleAuthCallback // or Proxy: true
	},
	mongoDB: {
		uri     : process.env.MongoDBUri || keys.mongoDBUri,
		user    : process.env.MongoDBUser || keys.mongoDBUser,
		password: process.env.MongoDBPassword || keys.mongoDBPassword
	},
	cookieKey : process.env.CookieKey || keys.cookieKey,
	cookieKeys: process.env.CookieKeys || keys.cookieKeys
}
