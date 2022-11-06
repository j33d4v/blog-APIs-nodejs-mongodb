const express = require('express');
const router = express.Router();
const userRoute = require('./user')
const blogRoute = require('./blog')


router.use('/', userRoute);
router.use('/blog', blogRoute);


module.exports = router;
