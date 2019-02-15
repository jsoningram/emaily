import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'

// eslint-disable-next-line
//const common = require( '../config' )['common']
//const env    = process.env.NODE_ENV || 'development'
//const config = require( '../config' )[ env ]

// Dummy componenets
const Dashboard = () => <h2>Dashboard</h2>
const NewSurvey = () => <h2>New Survey</h2>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()	
	}

	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<React.Fragment>
						<Header />
						<div className="container">
							<Route path="/" exact component={ Landing } />		
							<Route path="/surveys" exact component={ Dashboard } />		
							<Route path="/surveys/new" exact component={ NewSurvey } />		
						</div>
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		)
	}
}

export default connect( null, actions )( App )
