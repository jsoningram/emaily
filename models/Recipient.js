const mongoose   = require( 'mongoose' )
const { Schema } = mongoose

// Model class
const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
})

module.exports = recipientSchema
