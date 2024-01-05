const  asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.login_get = asyncHandler(async(req, res, next)=> {
	res.render('log-in-form', {
		title: 'Log in',
	});
});

exports.login_post = [
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
];

exports.signup_get = asyncHandler(async(req, res, next)=> {
	res.render('sign-up-form', {
		title: 'Sign Up',
	});
});

exports.signup_post = [
	body('first_name')
		.trim()
		.isString()
		.isLength({ min: 1 })
		.withMessage('First name is required'),

	body('last_name')
		.trim()
		.isString()
		.isLength({ min: 1 })
		.withMessage('Last name is required'),

	body('username')
		.trim()
		.isLength({ min: 1, max: 25 })
		.withMessage('Username must be between 1 and 25 characters')
		.matches((username)=>{
			const pattern = /^(?!.*__)[A-Za-z0-9_]+$/;
			return pattern.test(username);
		})
		.withMessage('Username can only contain alphanumeric and non-consecutive underscores')
		.custom(async (username) => {
			const usernameTaken = await User.isUsernameTaken(username);
			if (usernameTaken) return Promise.reject();
			return true;
		})
		.withMessage('Username is already taken'),

	body('password')
		.isLength({ min: 8 })
		.withMessage('Password is too short'),

	body('confirmPassword')
		.isLength({ min: 8 })
		.custom((confirmPass, { req }) => req.body.password === confirmPass)
		.withMessage('Passwords do not match'),
		
	asyncHandler(async(req, res, next)=>{
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log(errors.array());
			res.render('sign-up-form', {
				title: 'Sign up',
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				username: req.body.username,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword,
				errors: errors.array(),
			});
		} else {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const user = new User({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				username: req.body.username,
				password: hashedPassword,
			});

			await user.save();
			res.redirect('/');
		}
	}),

	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	}),
];