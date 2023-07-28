const express = require('express');
const router = express.Router();
const controller = require('../controller/userController'); // Import các controller từ tệp controller.js

// Route GET /users
router.get('/users', controller.getUsers);

// Route POST /addUser
router.post('/users', controller.addUser);

// Route DELETE /removeUser/:userId
router.delete('/users/:userId', controller.removeUser);

module.exports = router;