const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlogById,
  editBlogById,
  deleteBlogById,
} = require("../controllers/blogController")
const { validateBlog, validate } = require("../middleware/blogValidation")


router
  .route('/')
  .post(authenticate.verifyUser, validateBlog(), validate, createBlog)
  .get(getAllBlog)


router 
  .route('/:id')
  .get(getBlogById)
  .put(authenticate.verifyUser, authenticate.isAuthor, validateBlog(), editBlogById)
  .patch(authenticate.verifyUser, authenticate.isAuthor, updateBlogById)
  .delete(authenticate.verifyUser, authenticate.isAuthor, deleteBlogById)

router 
  .route('/logout')
  // .get(authenticate.verifyUser, logoutUser)


module.exports = router;
