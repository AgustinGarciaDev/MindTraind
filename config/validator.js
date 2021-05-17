const joi = require('joi')

const validator = (req, res, next) => {

    //const namesRegExp = `/^[a-z ' ñ á é í ó ú]*$/i`
    const password = /(?=.*\d)(?=.*[A-z])/

    const schema = joi.object({
        firstName: joi.string().trim().min(2).max(20).required().pattern(new RegExp(/^[a-z ' ñ á é í ó ú]{2,}$/i)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        lastName: joi.string().trim().min(2).max(20).required().pattern(new RegExp(/^[a-z ' ñ á é í ó ú]{2,}$/i)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        email: joi.string().trim().email().required().messages({
            'string.email': 'Use the format ej: name@example.com',
            'string.empty': 'You must complete this field'
        }),
        password: joi.string().min(5).trim().required().pattern(new RegExp(password)).messages({
            "string.empty": "You must complete this field",
            "string.min": "Your Password  must have at least 5 characters",
            "string.pattern.base": "Your Password must have at least a letter and a number",
        }),
        profilePicture: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field'
        }),
        role: joi.string().trim().messages({
            'string.empty': 'You must select one option'
        }),
        googleUser: joi.boolean()
    })

    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        return res.json({ succes: false, error: validation.error })
    }
    next()
}


module.exports = validator