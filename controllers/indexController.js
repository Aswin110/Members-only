const asyncHandler = require('express-async-handler');
const message = require('../models/message');

exports.indexPage = asyncHandler(async(req, res, next)=> {
	res.send('homepage not implemented');
});