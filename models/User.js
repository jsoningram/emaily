const mongoose   = require( 'mongoose' )
const { Schema } = mongoose

// Model class
const userSchema = new Schema({
	googleId : String,
	firstName: String,
	lastName : String,
	credits  : { type: Number, default: 0 },
	payments : { type: Array, default: [] }
})

mongoose.model( 'users', userSchema )
