import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Connector from '../utilities/Connector'
import * as actions from '../actions'
import Payments from './Payments'
import Logger from '../utilities/Logger'

const common = require( '../config' )['common']

const inlineStyles = {
	nav: {
		backgroundColor: '#666',
		marginBottom: '50px'
	},
	logo: {
		paddingLeft: '10px',
		cursor: 'pointer'
	},
	links: {
		margin: '0 10px'
	}
}

class Header extends Component {
	goHome = () => {
		this.props.history.push( '/' )	
	}

	logOut = ( e ) => {
		e.preventDefault()

		Connector.request({
			url: common.routes.logOut
		}).then( ( res ) => {
			this.props.fetchUser().then( () => {
				this.goHome()
			})
		})
	}

	handleLogoClick = () => {
		if ( !this.props.auth ) {
			this.goHome()
		} else {
			this.props.history.push( '/surveys' )	
		}
	}

	renderContent = () => {
		switch ( this.props.auth ) {
		case null:
			return

		case false:
			return (
				<li><a href={ common.routes.googleAuth }>Login with Google</a></li>
			)

		default:
			return [ 
				<li key="logged-header-1"><Payments /></li>,
				<li key="logged-header-2" style={ inlineStyles.links }>
					Credits: { this.props.auth.credits }
				</li>,
				<li key="logged-header-3"><a href="/" onClick={ ( e ) => this.logOut( e ) }>Logout</a></li>
			]	
		}
	}

	render() {
		Logger._log( 'Header.render', this.props )

		return (
			<nav style={ inlineStyles.nav }>
				<div className="nav-wrapper">
					<a
						href="/"
						onClick={ this.handleLogoClick }
						className="left brand-logo"
						style={ inlineStyles.logo }>
							Emaily
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{ this.renderContent() }
					</ul>
				</div>
			</nav>
		)
	}
}

function mapStateToProps( { auth } ) {
	return {
		auth
	}
}

export default withRouter( connect( mapStateToProps, actions )( Header ) )
