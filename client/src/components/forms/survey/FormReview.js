import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { FORM_FIELDS } from '../../../config/constants'

const FormReview = ( { onCancel, formValues, submitSurvey, auth, history } ) => {
	return (
		<React.Fragment>
			<h5>Please confirm your entries</h5>
			<div>
				{
					FORM_FIELDS.map( ( { label, name } ) => {
						return (
							<div key={ name }>
								<label>{ label }</label>
								<div>{ formValues[ name ] }</div>
							</div>
						)
					})
				}
			</div>
			<span style={{ display: 'block', marginTop: '20px' }}>
				<button
					className="red darken-4 white-text btn-flat"
					onClick={ onCancel } >
						Back
				</button>
				<button
					className="green white-text right btn-flat"
					onClick={ () => submitSurvey( auth, formValues, history ) } >
						Send Survey
						<i className="material-icons right">email</i>
				</button>
			</span>
		</React.Fragment>
	)
}

function mapStateToProps( state ) {
	return {
		formValues: state.form.surveyForm.values,
		auth      : state.auth
	}
}

export default connect( mapStateToProps, actions )( withRouter( FormReview ) )
