import { User } from "../models/User";
import { STATUS_CODES } from "../utils/codes";
import { USER_TYPE } from "../utils/enums";
import { MESSAGES } from "../utils/messages";
import schema from "../validation/user";

export const getAllProducers = async (req, res) => {
    try {
        // fetch all producers from database
        const producers = await User.findAll({ where: { type: USER_TYPE.PRODUCER }, order: [['id', 'DESC']] })

        // send success response
        return res.json(producers);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const getAllActors = async (req, res) => {
    try {
        // fetch all actors from database
        const actors = await User.findAll({ where: { type: USER_TYPE.ACTOR }, order: [['id', 'DESC']] })

        // send success response
        return res.json(actors);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, bio, gender, dob, type } = req.body;

        // validate user object
        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);

        // send validation error response
        if (errors?.length) return res.status(STATUS_CODES.BAD_REQUEST).json(errors)

        // create new user in database
        const newUser = await User.create({ name, bio, gender, dob, type });

        // send success response
        return res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.CREATED(type), data: newUser });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}