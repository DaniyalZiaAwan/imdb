import { Movie } from "../models/Movie";
import { User } from "../models/User";
import schema from "../validation/movie";

export const getAll = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const attributes = ['id', 'name']
        const { count, rows: movies } = await Movie.findAndCountAll({
            include: [
                { model: User, as: 'actors', attributes, through: { attributes: [] } },
                { model: User, as: 'producer', attributes }
            ],
            order: [['id', 'DESC']],
            distinct: true,
            offset,
            limit: parseInt(limit, 10)
        });

        return res.json({
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            data: movies,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params

        const attributes = ['id', 'name']
        const movie = await Movie.findByPk(id, {
            include: [
                { model: User, as: 'actors', attributes, through: { attributes: [] } },
                { model: User, as: 'producer', attributes }
            ],
        });

        if (!movie) return res.status(404).json('Movie not found')

        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const { name, plot, poster, release_date, producer, actors } = req.body;

        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);
        if (errors?.length) return res.status(400).json(errors)

        const newMovie = await Movie.create({ name, plot, poster, release_date, producer_id: producer });
        if (newMovie && actors.length > 0) await newMovie.addActors(actors);

        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, plot, poster, release_date, producer, actors } = req.body;

        let errors = schema.validate(req.body, { abortEarly: false })?.error?.details.map((err) => err.message);
        if (errors?.length) return res.status(400).json(errors)

        const movie = await Movie.findByPk(id)
        if (!movie) return res.status(404).json('Movie not found');

        await movie.update({ name, plot, poster, release_date, producer_id: producer })
        if (movie && actors.length > 0) await movie.setActors(actors);

        return res.status(200).json('Movie updated');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await Movie.destroy({ where: { id } })
        return res.status(200).json({ status: 'Deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}