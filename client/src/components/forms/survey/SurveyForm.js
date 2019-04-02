import { FORM_FIELDS, FORMS } from '../../../config/constants'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import Utility from '../../../utilities/Utility'
import SurveyField from './Field'

const inlineStyles = {
	buttons: {
		reset: {
			marginRight: '10px'
		}
	}
}

class SurveyForm extends Component {
	constructor ( props ) {
		super( props )

		this.state = {
			title     : null,
			subject   : null,
			recipients: null,
			body      : null
		}
	}	

	renderFields = () => {
		return FORM_FIELDS.map( ( { label, name } ) => {
			return (
				<Field
					key={ name }
					component={ SurveyField }
					type="text"
					label={ label }
					name={ name }
				/>
			)
		})
	}

	reset = () => {
		this.props.reset()	
	}

	cancel = () => {
		this.props.history.push( '/surveys' )
	}

	render() {
		return (
			<React.Fragment>
				<form onSubmit={ this.props.handleSubmit( this.props.onSurveySubmit ) } >
					{ this.renderFields() }
					<span style={{ display: 'block', marginTop: '20px' }}>
						<button
							onClick={ this.reset }
							style={ inlineStyles.buttons.reset }
							type="reset"
							className="red darken-4 btn-flat left white-text">
								Reset
						</button>
						<button
							onClick={ this.cancel }
							type="reset"
							className="red darken-4 btn-flat left white-text">
								Cancel
								<i className="material-icons right">cancel</i>
						</button>
						<button
							type="submit"
							className="blue btn-flat right white-text">
								Next
								<i className="material-icons right">done</i>
						</button>
					</span>
				</form>
			</React.Fragment>
		)
	}
}

// Redux form validation
function validate( values ) {
	const errors = {}

	errors.recipients = Utility.validateEmails( values.recipients || '' )

	FORM_FIELDS.map( ( { name } ) => {
		if ( !values[ name ] ) {
			errors[ name ] = `You must provide a ${ name }`
		}
		
		return errors
	})

	return errors
}

export default withRouter( reduxForm({
	form            : FORMS.SURVEY,
	destroyOnUnmount: false,
	validate
})( SurveyForm ) )
