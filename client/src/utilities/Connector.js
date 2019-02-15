import axios from 'axios'

class Connector {
	static request ( requestConfig ) {
		requestConfig.withCredentials = true

		return axios.request( requestConfig ).then( ( res ) => {
			console.log( 'Connector.request', res )
			
			return res
		}).catch( ( e ) => {
			console.error( 'Connector.request', e )
		})
	}
}

export default Connector
