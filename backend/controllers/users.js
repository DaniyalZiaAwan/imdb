import { USER_TYPE } from "../enums/userType";
import { User } from "../models/User";
import schema from "../validation/user";

export const getAllProducers = async (req, res) => {
    try {
        const producers = await User.findAll({ where: { type: USER_TYPE.PRODUCER }, order: [['id', 'DESC']] })
        return res.json(producers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllActors = async (req, res) => {
    try {
        const actors = await User.findAll({ where: { type: USER_TYPE.ACTOR }, order: [['id', 'DESC']] })
        return res.json(actors);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, bio, gender, dob, type } = req.body;

        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);
        if (errors?.length) return res.status(400).json(errors)

        const newUser = await User.create({ name, bio, gender, dob, type });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}