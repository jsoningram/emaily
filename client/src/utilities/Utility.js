class Utility {
	static validateEmails( str ) {
		str = str.replace( /,+$/, '' )

		const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

		const arr = str.split( ',' ).map( curr => {
			return curr.trim()
		}).filter( el => false === re.test( el ) )

		if ( arr.length ) {
			return `These email addresses are invalid: ${ arr }`
		}

		return
	}
}

export default Utility
