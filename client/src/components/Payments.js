import React, { Component } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions'

const common = require( '../config' )['common']

const inlineStyles = {
	stripe: {
		backgroundColor: '#2196f3'
	}
}

class Payments extends Component {
    constructor( props ) {
        super( props )

		this.numCredits = 5

		this.state = {
			userId        : this.props.auth.googleId,
			currency      : 'usd',
			amount        : this.numCredits * 100,
			credits       : this.numCredits,
			description   : `${ common.siteTitle } $5 for 5`,
			stripeResponse: {}
		}
	}

	paymentCallback = ( stripeResponse ) => {
		this.setState({
			stripeResponse
		}, () => {
			this.props.handleStripeResponse( this.state )
		})
	}

	render() {
		return (
			<StripeCheckout
				name={ common.siteTitle }
				description={ this.state.description }
				amount={ this.state.amount }
				token={ ( res ) => this.paymentCallback( res )  }
				stripeKey={ common.stripe.publishableKey }
			>
				<button style={ inlineStyles.stripe } className="btn">
					Add Credits
				</button>
			</StripeCheckout> 
		)
	}
}

function mapStateToProps( { auth } ) {
	return {
		auth
	}
}

export default connect( mapStateToProps, actions )( Payments )
