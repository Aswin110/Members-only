const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const { errors } = require('formidable');

exports.messageDetail = asyncHandler(async(req, res, next)=> {
	const message = await Message.findById(req.params.id).populate('user').exec();

	if(!message) {
		const err = new Error('Message not found');
		err.status = 404;
		next(err);
	}

	res.render('message-details', {
		title : message.title,
		message:message,
	});
});

exports.message_new_get = asyncHandler(async(req, res, next)=> {
	res.render('new-message',{
		title: 'New message'
	});
});

exports.message_new_post = [
	body('title')
		.trim()
		.isLength({min:1})
		.withMessage('Title is required'),
	body('summary')
		.trim()
		.isLength({min:1})
		.withMessage('Message is required'),

	asyncHandler(async(req, res, next)=> {
		if (!req.user) {
			const err = new Error('User not logged in');
			err.status = 400;
			next(err);
		}

		const errors = validationResult(req);

		const message = new Message({
			title: req.body.title,
			summary: req.body.summary,
			user: req.user.id,
		});

		if (!errors.isEmpty()) {
			res.render('new-message',{
				title: 'New message',
				message: message,
				errors: errors.array(),
			});
		} else {
			await message.save();
			res.redirect('/');
		}
	}),
];

exports.message_delete_get = asyncHandler(async (req, res, next) => {
	const message = await Message.findById(req.params.id).exec();
	res.render('delete-message', {
		title: 'Delete',
		message: message,
	});
});


exports.message_delete_post = asyncHandler(async(req, res, next)=> {
	await Message.findByIdAndDelete(req.params.id).exec();
	res.redirect('/');
});