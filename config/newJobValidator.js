const joi = require('joi')

const newJobValidator = (req, res, next) => {

    const namesRegExp = `^[a-zA-Z]*$`
    const password = /(?=.*\d)(?=.*[A-z])/
    const text = `^[a-zA-Z_ -]*`

    const schema = joi.object({
        nameOfferent: joi.string().trim().min(2).max(20).required().pattern(new RegExp(namesRegExp)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        description: joi.string().trim().min(2).required().pattern(new RegExp(text)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        jobTittle: joi.string().trim().min(2).max(20).required().pattern(new RegExp(text)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        typeJob: joi.string().trim().min(2).max(20).required().pattern(new RegExp(text)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        modality: joi.string().trim().min(2).max(20).required().pattern(new RegExp(text)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.max': 'A maximum of 20 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        email: joi.string().trim().email().required().messages({
            'string.email': 'Use the format ej: name@example.com',
            'string.empty': 'You must complete this field'
        }),
        urlImage: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field'
        }),
        country: joi.string().trim().messages({
            'string.empty': 'You must select one option'
        })
    })

    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        return res.json({ success: false, error: validation.error })
    }
    next()
}

module.exports = newJobValidator