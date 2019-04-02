import { FETCH_USER } from '../actions/types'

export default function ( state = null, action ) {
	switch ( action.type ) {
	case FETCH_USER.SUCCESS:
		return action.payload || false

	case FETCH_USER.FAILURE:
		return action.payload

	default:
		return state
	}
}
