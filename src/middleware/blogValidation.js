const { body, validationResult } = require('express-validator')


function validateBlog() {
    return [
        body('title')
            .notEmpty(),
        body('description')
            .notEmpty(),
        body('tags') 
            .notEmpty(),
        body('body')
            .optional({ nullable: false })
    ]
}


function validateLogin() {
    return [
        body('email') 
            .isEmail()
            .withMessage('Please enter a valid email.')     
            .normalizeEmail(),
        // password must be at least 5 chars long
        body('password')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim(),
    ]
}

function validate(req, res, next) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validateBlog,
    validateLogin,
    validate
}