const asyncHandler = require('express-async-handler');
const message = require('../models/message');
const User = require('../models/user');
const {body, validationResult} = require('express-validator');

exports.member_get = asyncHandler(async(req, res, next)=> {
	if (!req.user) res.redirect('/login');
	else {
		res.render('membership',{
			title: 'Membership'
		});
	}
});

exports.member_post =asyncHandler( async(req, res, next) => {
	if(req.body.password !== process.env.MEMBERSHIP) {
		res.render('membership',{
			title: 'Membership',
			password: req.body.password,
			error: 'Incorrect password'
		});
		return;
	} else {
		if(req.user) {
			req.user.membershipStatus = 'member';
			await req.user.save();
			res.redirect('/');
		} else {
			const err = new Error('User not found');
			err.status = 400;
			next(err);
		}
	}
});


exports.admin_get = asyncHandler(async(req, res, next)=> {
	if (!req.user) res.redirect('/login');
	else {
		res.render('admin',{
			title: 'Admin'
		});
	}
});

exports.admin_post = asyncHandler(async(req, res, next)=> {
	if(req.body.password !== process.env.ADMIN) {
		res.render('admin',{
			title: 'Admin',
			password: req.body.password,
			error: 'Incorrect password'
		});
		return;
	} else {
		if(req.user) {
			req.user.membershipStatus = 'admin';
			await req.user.save();
			res.redirect('/');
		} else {
			const err = new Error('User not found');
			err.status = 400;
			next(err);
		}
	}
});