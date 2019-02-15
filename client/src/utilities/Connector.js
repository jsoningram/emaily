import axios from 'axios'
import Logger from './Logger'

class Connector {
	static request ( requestConfig ) {
		requestConfig.withCredentials = true

		return axios.request( requestConfig ).then( ( res ) => {
			Logger._log( 'Connector.request', res )
			
			return res
		}).catch( ( e ) => {
			Logger._error( 'Connector.request', e )
		})
	}
}

export default Connector
