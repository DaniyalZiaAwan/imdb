import { Movie } from "../models/Movie";
import { User } from "../models/User";
import { STATUS_CODES } from "../utils/codes";
import { MESSAGES } from "../utils/messages";
import schema from "../validation/movie";

export const getAll = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const attributes = ['id', 'name']

        // fetch movies from database
        const { count, rows: movies } = await Movie.findAndCountAll({
            include: [
                { model: User, as: 'actors', attributes, through: { attributes: [] } },
                { model: User, as: 'producer', attributes }
            ],
            order: [['id', 'DESC']],
            distinct: true,

            // pagination
            offset,
            limit: parseInt(limit, 10)
        });

        // send success response
        return res.json({
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            data: movies,
        });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params

        const attributes = ['id', 'name']

        // fetch single movie from database
        const movie = await Movie.findByPk(id, {
            include: [
                { model: User, as: 'actors', attributes, through: { attributes: [] } },
                { model: User, as: 'producer', attributes }
            ],
        });

        // send error response
        if (!movie) return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.NOT_FOUND('Movie'))

        // send success response
        return res.json(movie);
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const { name, plot, poster, release_date, producer, actors } = req.body;

        // validate movie object
        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);

        // send validation error response
        if (errors?.length) return res.status(STATUS_CODES.BAD_REQUEST).json(errors)

        // create new movie in database
        const newMovie = await Movie.create({ name, plot, poster, release_date, producer_id: producer });

        // add movie actors in database
        if (newMovie && actors.length > 0) await newMovie.addActors(actors);

        // send success response
        return res.status(STATUS_CODES.CREATED).json({ message: MESSAGES.CREATED('Movie'), data: newMovie });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, plot, poster, release_date, producer, actors } = req.body;

        // validate movie object
        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);

        // send validation error response
        if (errors?.length) return res.status(STATUS_CODES.BAD_REQUEST).json(errors)

        // fetch single movie from database
        const movie = await Movie.findByPk(id)

        // send error response
        if (!movie) return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.NOT_FOUND('Movie'));

        // update movie in database
        await movie.update({ name, plot, poster, release_date, producer_id: producer })

        // update movie actors in database
        if (movie && actors.length > 0) await movie.setActors(actors);

        // send success response
        return res.status(STATUS_CODES.OK).json({ message: MESSAGES.UPDATED('Movie') });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        // delete single movie from database
        // THIS IS HARD DELETE, we can also implement soft delete by adding deleted_at column
        await Movie.destroy({ where: { id } })

        // send success response
        return res.status(STATUS_CODES.OK).json({ message: MESSAGES.DELETED('Movie') });
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}