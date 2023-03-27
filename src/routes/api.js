import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';

const router = express.Router();

//= ===============================
// API routes
//= ===============================

// common APIs
router.get('/profile', userController.profile);

router.get('/users', userController.getUsers);

module.exports = router;
