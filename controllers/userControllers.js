const asyncHandler = require('express-async-handler');
const message = require('../models/message');

exports.member_get = asyncHandler(async(req, res, next)=> {
	res.send('the members get page is not implemented');
});

exports.member_post = asyncHandler(async(req, res, next)=> {
	res.send('the members post page is not implemented');
});

exports.admin_get = asyncHandler(async(req, res, next)=> {
	res.send('the admin get page is not implemented');
});

exports.admin_post = asyncHandler(async(req, res, next)=> {
	res.send('the admin post page is not implemented');
});