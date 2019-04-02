const sendGrid      = require( '@sendgrid/mail' )
const config        = require( '../config' )

sendGrid.setApiKey( config.sendGrid.apiKey )

class Mailer {
	constructor( { subject, body, recipients, _id } ) {
		this.id            = _id
		this.subject       = subject
		this.body          = body
		this.recipients    = this.formatAddresses( recipients )
		this.thankYouRoute = '/api/surveys/'
	}

	createTemplate() {
		return `
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<title></title>
			</head>

			<body>
				<div style="text-align: center;">
					<h1>I'd like your input!</h1>
					<h2>Please answer the following question:</h2>
					${ this.body }
					<div> <a href="${ config.redirectDomain }${ this.thankYouRoute }${ this.id }/yes">Yes</a> </div>
					<div> <a href="${ config.redirectDomain }${ this.thankYouRoute }${ this.id }/no">No</a> </div>
				</div>
			</body>
			</html>
		`
	}

	createMessage() {
		return {
			to: this.recipients,
			from: {
				email: 'no-reply@emaily.com',
				name: 'Emaily'
			},
			subject: this.subject,
			content: [
				{
					type: 'text/html',
					value: this.createTemplate(),
				}
			],
			isMultiple: Array.isArray( this.recipients ),
			trackingSettings: {
				clickTracking: {
					enable: true
				}
			},
		}
	}

	formatAddresses( recipients ) {
		let arr = []

		recipients.map( ( recipient ) => {
			arr.push( recipient.email )

			return
		})

		// There's more than one address
		if ( arr.length > 1 ) {
			return arr
		}
		
		// return string
		return arr[0]
	}

	send() {
		return sendGrid.send( this.createMessage() ).then( () => {
			console.log( 'Mail sent', this.createMessage() )

			return 'Success'
		}).catch( ( e ) => {
			console.error( 'Error', e.toString() )

			return e.toString()
		})
	}
}

module.exports = Mailer
