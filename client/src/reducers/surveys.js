import { SUBMIT_SURVEY, FETCH_SURVEYS } from '../actions/types'

export default function ( state = null, action ) {
	switch ( action.type ) {
	case SUBMIT_SURVEY.SUCCESS:
		return action.payload

	case FETCH_SURVEYS.SUCCESS:
		return action.payload

	case SUBMIT_SURVEY.FAILURE:
		return action.payload

	case FETCH_SURVEYS.FAILURE:
		return action.payload

	default:
		return state
	}
}
