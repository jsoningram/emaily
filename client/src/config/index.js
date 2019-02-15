module.exports = {
	common: {
		siteTitle: 'Emaily',
		routes: {
			googleAuth : '/auth/google',
			currentUser: 'api/current_user',
			logOut     : '/api/logout',
			stripe     : '/api/stripe'
		},
		stripe: {
			publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
		}
	},
	development: {
		localProxyServer: {
			uri: 'http://localhost:5000'
		}
	},
	production: {
	}
}
