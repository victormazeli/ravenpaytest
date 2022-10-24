const { body } = require('express-validator')
// validation rules
const validateNewUser = () => {
    return [
        body('phone_number').exists({ checkFalsy: true }).toLowerCase().trim().isMobilePhone().isString(),
        body('first_name').exists({ checkFalsy: true }).toLowerCase().trim().isString(),
        body('last_name').exists({ checkFalsy: true }).toLowerCase().trim().isString(),
        body('email').exists({ checkFalsy: true }).isEmail().toLowerCase().isString(),
        body('password').exists({ checkFalsy: true })
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    
    ]
}

const validateLogin = () => {
    return [
        body('email').exists({ checkFalsy: true }).toLowerCase().trim(),
        body('password').exists({ checkFalsy: true })
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    
    ]
}

const validatePayment = () => {
    return [
        body('amount').exists({ checkFalsy: true }).isNumeric(),
        body('bank').exists({ checkFalsy: true }).isString(),
        body('bank_code').exists({ checkFalsy: true }).isString(),
        body('account_number').exists({ checkFalsy: true }).isString(),
        body('account_name').exists({ checkFalsy: true }).isString(),
        body('narration').exists({ checkFalsy: true }).isString(),
        body('reference').exists({ checkFalsy: true }).isString(),

    ]
    
}

module.exports = { validateNewUser, validateLogin, validatePayment }
