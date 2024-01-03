const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	title: {type:String, required:true},
	message: { type:String, required:true},
	time: { type:Date, default: ()=> new Date(), immutable:true},
	user: {type: Schema.Types.ObjectId, ref:'User', required:true},
});

messageSchema.virtual('formatted_date').get(function(){
	return DateTime.fromJSDate(this.time).toFormat('LLL dd yyyy HH:mm:ss');
});

messageSchema.virtual('url').get( function getUrl(){
	return `/message/${this._id}`;
});

module.exports = mongoose.model('Message', messageSchema);