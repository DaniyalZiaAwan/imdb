import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().messages({ 'string.empty': 'Name is required'}),
    release_date: Joi.string().required().messages({ 'string.empty': 'Release date is required'}),
    producer: Joi.string().required().messages({ 'string.empty': 'Producer is required'}),
    actors: Joi.array().min(1).messages({ 'array.min': 'At least one actor is required'}),
    plot: Joi.optional(),
    poster: Joi.string().uri().required().allow('').messages({ 'string.uri': 'Poster URL is invalid'})
});

export default schema