const mongoose   = require( 'mongoose' )
const { Schema } = mongoose

// Model class
const userSchema = new Schema({
	googleId : String,
	firstName: String,
	lastName : String
})

mongoose.model( 'users', userSchema )
