import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys()
	}

	renderContent = ( { surveys } ) => {
		switch ( surveys ) {
		case null:
			return null

		default:
			return surveys.map( ( curr, index ) => {
				let dateSent     = new Date( curr.dateSent ).toUTCString(),
					lastResponse = curr.lastResponded
						? new Date( curr.lastResponded ).toUTCString()
						: 'No response yet'

				return (
					<ul key={ index } className="collection">
						<li key={ curr._id } className="collection-item">
							<span className="title">{ curr.title }</span>
							<p>
								Sent: { dateSent }
								<br />
								Last Response Received: { lastResponse }
								<br />
								Yes: { curr.yes }
								<br />
								No: { curr.no } 
							</p>
						</li>
					</ul>
				)	
			})
		}
	}
	
	render() {
		return (
			<React.Fragment>
				{ this.renderContent( this.props ) }
			</React.Fragment>
		)
	}
}

function mapStateToProps( { surveys } ) {
	return {
		surveys
	}
}

export default connect( mapStateToProps, actions )( SurveyList )
