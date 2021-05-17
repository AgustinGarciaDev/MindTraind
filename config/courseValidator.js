const joi = require('joi')
const joiId = require('joi-oid')

const validator = (req, res, next) => {

    const namesRegExp = `^[a-zA-Z_ -]*`

    const schema = joi.object({
        nameCourse: joi.string().trim().min(2).required().pattern(new RegExp(namesRegExp)).messages({
            'string.min': 'A minimum of 2 characters.',
            'string.pattern.base': 'You can only use letters',
            'string.empty': 'You must complete this field'
        }),
        email: joi.string().trim().email().required().messages({
            'string.email': 'Use the format ej: name@example.com',
            'string.empty': 'You must complete this field'
        }),
        pictureRefence: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field'
        }),
        programDescription: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field'
        }),
        duration: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field',
            'string.pattern.base': 'You can only use one number',
        }),
        difficulty: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field',
            'string.pattern.base': 'You can only use one number',
        }),

        categories: joi.array()
            .items({
                name: joi.string().trim().min(2).required().pattern(new RegExp(namesRegExp)).messages({
                    'string.min': 'A minimum of 2 characters.',
                    'string.pattern.base': 'You can only use letters',
                    'string.empty': 'You must complete this field'
                })

            }),

        lessons: joi.array()
            .items({
                lessonName: joi.string().trim().min(2).required().pattern(new RegExp(namesRegExp)).messages({
                    'string.min': 'A minimum of 2 characters.',
                    'string.pattern.base': 'You can only use letters',
                    'string.empty': 'You must complete this field'
                }),
                videoLink: joi.string().trim().required().messages({
                    'string.empty': 'You must complete this field'
                }),
            })
    })

    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        return res.json({ success: false, error: validation.error })
    }
    next()
}

module.exports = validator