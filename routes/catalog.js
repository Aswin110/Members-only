const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');
const messageControllers = require('../controllers/messageController');
const userController = require('../controllers/userControllers');

router.get('/', indexController.indexPage);

router.get('/logout', authController.logout_post);

router.get('/message/new', messageControllers.message_new_get);

router.post('/message/new', messageControllers.message_new_post);

router.get('/message/:id', messageControllers.messageDetail);

router.get('/message/:id/delete', messageControllers.message_delete_get);

router.post('/message/:id/delete', messageControllers.message_delete_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/member', userController.member_get);

router.post('/member', userController.member_post);

router.get('/admin', userController.admin_get);

router.post('/admin', userController.admin_post);
  
module.exports = router;