const { body, validationResult } = require('express-validator')
const { userModel : User } = require('../model/users');


function validateSignUp() {
    return [
        // username must be an email
        body('first_name')
            .notEmpty(),
        body('last_name')
            .notEmpty(),
        body('email') 
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
              return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                  return Promise.reject(
                    'E-Mail exists already, please pick a different one.'
                  );
                }
              });
            })            
            .normalizeEmail(),
        // password must be at least 5 chars long
        body('password')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim(),
        body("phone_number")
            .isNumeric()
            .optional({ nullable: true })
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
    validateSignUp,
    validateLogin,
    validate
}