const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');


exports.indexPage = asyncHandler(async (req, res, next) => {
	const messages = await Message.find()
		.sort({time:-1})
		.populate('user')
		.exec();
  
	res.render('index', { title: 'Members Only', messages });
});