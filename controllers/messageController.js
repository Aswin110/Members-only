const asyncHandler = require('express-async-handler');
const message = require('../models/message');
const user = require('../models/user');

exports.messageDetail = asyncHandler(async(req, res, next)=> {
	res.send('message detailed page not implemented');
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