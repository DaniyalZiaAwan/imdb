import { User } from "../models/User";
import { USER_TYPE } from "../utils/enums";
import schema from "../validation/user";

export const getAllProducers = async (req, res) => {
    try {
        // fetch all producers from database
        const producers = await User.findAll({ where: { type: USER_TYPE.PRODUCER }, order: [['id', 'DESC']] })

        // send success response
        return res.json(producers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllActors = async (req, res) => {
    try {
        // fetch all actors from database
        const actors = await User.findAll({ where: { type: USER_TYPE.ACTOR }, order: [['id', 'DESC']] })

        // send success response
        return res.json(actors);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, bio, gender, dob, type } = req.body;

        // validate user object
        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);

        // send validation error response
        if (errors?.length) return res.status(400).json(errors)

        // create new user in database
        const newUser = await User.create({ name, bio, gender, dob, type });

        // send success response
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}