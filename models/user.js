const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required:true, unique: true },
	password: { type:String, required:true, minlength:8 },
	membershipStatus: { type:String, enum: ['member', 'admin', 'none'], default:'none'},
});

module.exports = mongoose.model('User', UserSchema);