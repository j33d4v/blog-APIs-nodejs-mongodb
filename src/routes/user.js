const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController.js")
const { validateSignUp, validateLogin, validate } = require("../middleware/authValidation")


// /* GET users listing. */
// router
//   .route('/')
//   .get(getAllUser)

router
  .route('/signup')
  .post(validateSignUp(), validate, createUser)

router 
  .route('/login')
  .post(validateLogin(), validate, loginUser)

router 
  .route('/logout')
  .get(authenticate.verifyUser, logoutUser)


module.exports = router;
