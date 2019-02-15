import axios from 'axios'
import { FETCH_USER } from './types'

const common = require( '../config' )['common']

export const fetchUser = () => {
	// Redux Thunk sees we return a function and gives us access to dispatch
	return async ( dispatch ) => {
		try {
			const res = await axios.get( common.routes.currentUser )

			dispatch({
				type: FETCH_USER.SUCCESS,
				payload: res.data
			})
		} catch {
			dispatch({
				type: FETCH_USER.FAILURE,
				payload: null 
			})
		}
	}
}

export const handleStripeResponse = ( response ) => {
	return async ( dispatch ) => {
		try {
			const res = await axios.post( common.routes.stripe, response )

			dispatch({
				type: FETCH_USER.SUCCESS,
				payload: res.data
			})
		} catch {
			dispatch({
				type: FETCH_USER.FAILURE,
				payload: null 
			})
		}
	}
}
