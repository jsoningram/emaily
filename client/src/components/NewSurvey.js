import { FORMS } from '../config/constants'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import SurveyForm from './forms/survey/SurveyForm'
import FormReview from './forms/survey/FormReview'

class NewSurvey extends Component {
	// CRA let's us initialize state object outside of a constructor
	state = {
		showFormReview: false
	}

	renderContent = () => {
		if ( this.state.showFormReview ) {
			return (
				<FormReview
					onCancel={ () => this.setState({ showFormReview: false }) }
				/>
			)
		}

		return (
			<SurveyForm
				onSurveySubmit={ () => this.setState({ showFormReview: true }) }
			/>
		)
	}

	render() {
		return (
			<React.Fragment>
				{ this.renderContent() }
			</React.Fragment>
		)
	}
}

export default withRouter( reduxForm({
	form: FORMS.SURVEY 
})( NewSurvey ) )
