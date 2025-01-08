import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().messages({ 'string.empty': 'Name is required' }),
    gender: Joi.string().required().messages({ 'string.empty': 'Gender is required' }),
    dob: Joi.date().required().less('now').messages({ 'date.base': 'Date of birth is required', 'date.less': 'Date of birth must be past date' }),
    type: Joi.optional(),
    bio: Joi.optional(),
});

export default schema