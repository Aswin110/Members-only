/* eslint-disable no-undef */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const User = require('./models/user');
const compression = require('compression');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 100,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const { default: mongoose } = require('mongoose');

dotenv.config();
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
	console.log('connected to mongodb');
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
	new  LocalStrategy(async(username, password, done) => {
		try{
			const user = await User.findOne({username: username});
			if(!user) {
				return done(null, false, {message: 'Incorrect username'});
			}
			
			bcrypt.compare(password, user.password, (err, res)=> {
				if (err) return done(err);
				if (res) return done(null, user);
				return done(null, false, {message:'Incorrect password'});
			});

		} catch(err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
	try {  
		const user = await User.findById(id);
		done(null,user);
	} catch {
		done(err);
	}
});

app.use((req, res, next)=> {
	res.locals.user = req.user,
	res.locals.isMember = req.user && req.user.membershipStatus !== 'none',
	next();
});

app.use(helmet());
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	console.error(err.stack);
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
