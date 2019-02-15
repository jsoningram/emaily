const env    = process.env.NODE_ENV || 'development'
const config = require( '../config' )[ env ]

export default class Logger {
    /**
     * Log messages to console for environments < production
     *
     * @method _log
     * @static
     * @return null
     */
    static _log() {
        if ( 'production' !== process.env.NODE_ENV || 'true' === config.enableLogging ) {
            console.log.apply( console, arguments )
        }
    }

    /**
     * Log errors to console for environments < production
     *
     * @method _error
     * @static
     * @return null
     */
    static _error() {
        if ( 'production' !== process.env.NODE_ENV || 'true' === config.enableLogging ) {
            console.error.apply( console, arguments )
        }
    }
}
