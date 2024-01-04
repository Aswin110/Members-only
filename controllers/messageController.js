const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');

exports.messageDetail = asyncHandler(async(req, res, next)=> {
	const message = await Message.findById(req.params.id).populate('user').exec();

	if(!message) {
		const err = new Error('Message not found');
		err.status = 404;
		next(err);
	}

	res.render('message-post', {
		title : message.title,
		message:message,
	});
});

exports.message_new_get = asyncHandler(async(req, res, next)=> {
	res.send('new message get page not implemented');
});

exports.message_new_post = asyncHandler(async(req, res, next)=> {
	res.send('new message post page not implemented');
});

exports.message_delete_get = asyncHandler(async(req, res, next)=> {
	res.send('delete message get page not implemented');
});

exports.message_delete_post = asyncHandler(async(req, res, next)=> {
	res.send('delete message post page not implemented');
});