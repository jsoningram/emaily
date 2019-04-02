import React from 'react'

// "input" is a property on props. Destructured here
export default ( { input, label, meta: { error, touched } } ) => {
	return (
		<div>
			<label>{ label }</label>
			<input { ...input } style={{ marginBottom: '5px'}} />
			{ ( touched && error )
				&& <div style={{ color: '#b71c1c', marginBottom: '20px' }}>{ error }</div>
			}
		</div>
	)
}
