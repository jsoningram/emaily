module.exports = {
	common: {
		siteTitle: 'Emaily',
		routes: {
			googleAuth : '/auth/google',
			currentUser: '/api/current_user',
			logOut     : '/api/logout',
			stripe     : '/api/stripe',
			surveys    : '/api/surveys'
		},
		stripe: {
			publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
		}
	},
	development: {
		localProxyServer: {
			uri: 'http://localhost:5000'
		},
		enableLogging: true
	},
	production: {
		enableLogging: process.env.REACT_APP_ENABLE_LOGGING 
	}
}
