#! /usr/bin/env node

console.log(
	'This script populates some users and messages to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
  
const User = require('./models/user');
const Message = require('./models/message');
  
const users = [];
const messages = [];
  
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
  
const mongoDB = userArgs[0];
  
main().catch((err) => console.log(err));
  
async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createUsers();
	await createMessages();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}

async function userCreate(index, first_name, last_name, username, password, membershipStatus) {
	const userDetail = { 
		first_name: first_name, 
		last_name: last_name, 
		username: username, 
		password:password, 
		membershipStatus:membershipStatus
	};
  
	const user = new User(userDetail);
  
	await user.save();
	users[index] = user;
	console.log(`Added user: ${first_name} ${last_name}`);
}
  
async function messageCreate(index, title, summary, user) {
	const messageDetail = {
		title: title,
		summary: summary,
		user: user,
	};
  
	const message = new Message(messageDetail);
	await message.save();
	messages[index] = message;
	console.log(`Added message: ${title}`);
}
  
async function createUsers() {
	console.log('Adding users');
	await Promise.all([
		userCreate(0, 'Aswin', 'Ashok', 'AswinAshok', 'Password@123', 'admin'),
		userCreate(1, 'Ben', 'Bova', 'BenBova', 'Password@123','member'),
		userCreate(2, 'John', 'Wick', 'JohnWick', 'Password@123','none'),
	]);
}
  
async function createMessages() {
	console.log('Adding Books');
	await Promise.all([
		messageCreate(0,
			'First message',
			'Hi there!',
			users[0],
		),
		messageCreate(1,
			'second message',
			'Hi there!',
			users[1],
		),
		messageCreate(2,
			'third message',
			'Hi there!',
			users[2],
		),
	]);
}
