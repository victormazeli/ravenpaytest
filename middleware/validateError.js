const { validationResult } = require('express-validator')

const validateError = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    return next();
}

module.exports = validateError
