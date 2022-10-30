const express = require('express');
const router = express.Router();
// var passport = require("passport")
// const authenticate = require('../middleware/authenticate')
const {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUser,
  getOneUser,
  loginUser,
  logoutUser,
  getSellers,
  getSellerById
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

//   router 
//   .route('/logout')
//   .get(authenticate.verifyUser, logoutUser)

// router
//   .route('/sellers')
//   .get(getSellers)


// router
//   .route('/sellers/:id')
//   .get(getSellerById)


// router
//   .route('/:id')
//   .put(updateUserById)
//   .get(getOneUser)
//   .delete(deleteUserById)

module.exports = router;