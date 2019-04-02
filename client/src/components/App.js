import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'
import NewSurvey from './NewSurvey'
import Dashboard from './Dashboard'

// Dummy componenets
const NotFound  = () => <h2>404</h2>

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
							<Switch>
								<Route path="/" exact component={ Landing } />		
								<Route path="/surveys" exact component={ Dashboard } />		
								<Route path="/surveys/new" exact component={ NewSurvey } />		
								<Route component={ NotFound } />		
							</Switch>
						</div>
					</React.Fragment>
				</BrowserRouter>
			</React.Fragment>
		)
	}
}

export default connect( null, actions )( App )
