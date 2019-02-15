import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider  } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import Logger from './utilities/Logger'

// pass in reducers, initial state and middlewares
const store = createStore( reducers, {}, applyMiddleware( reduxThunk ) )

Logger._log( 'process.env', process.env.enableLogging )

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById( 'root' )
)
