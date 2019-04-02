import {
	FETCH_USER,
	SUBMIT_SURVEY,
	FETCH_SURVEYS
} from './types'
import axios from 'axios'
import Logger from '../utilities/Logger'
import Connector from '../utilities/Connector'

const common = require( '../config' )['common']

export const fetchUser = () => {
	// Redux Thunk sees we return a function and gives us access to dispatch
	return async ( dispatch ) => {
		try {
			const res = await axios.get( common.routes.currentUser )
			
			Logger._log( 'fetchUser', res )

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

			Logger._log( 'handleStripeResponse', res )

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

export const submitSurvey = ( auth, values, history ) => {
	const { body, recipients, subject, title } = values

	return async ( dispatch ) => {
		try {
			const res = await Connector.request({
				url: common.routes.surveys,
				method: 'POST',
				data: {
					userId: auth.googleId,
					recipients,
					title,
					subject,
					body
				}
			})

			Logger._log( 'submitSurvey', res )

			history.push( '/surveys' )

			dispatch({
				type: SUBMIT_SURVEY.SUCCESS,
				payload: res.data
			})
		} catch {
			dispatch({
				type: SUBMIT_SURVEY.FAILURE,
				payload: null
			})
		}
	}
}

export const fetchSurveys = () => {
	return async ( dispatch ) => {
		try {
			const res = await Connector.request({
				url: common.routes.surveys,
				method: 'GET',
				params: {}
			})

			Logger._log( 'fetchSurveys', res )

			dispatch({
				type: FETCH_SURVEYS.SUCCESS,
				payload: res.data
			})
		} catch {
			dispatch({
				type: FETCH_SURVEYS.FAILURE,
				payload: null
			})
		}
	}
}
