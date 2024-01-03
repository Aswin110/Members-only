const  asyncHandler = require('express-async-handler');
const message = require('../models/message');
const user = require('../models/user');

exports.login_get = asyncHandler(async(req, res, next)=> {
	res.send('login page get not implemented');
});

exports.login_post = asyncHandler(async(req, res, next)=> {
	res.send('login page post not implemented');
});

exports.signup_get = asyncHandler(async(req, res, next)=> {
	res.send('signup page get not implemented');
});

exports.signup_post = asyncHandler(async(req, res, next)=> {
	res.send('signup page post not implemented');
});