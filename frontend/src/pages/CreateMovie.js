import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreateUser from '../components/CreateUser';
import { createMovie, fetchMovie, updateMovie } from '../redux/movieSlice';
import { fetchAllActors, fetchAllProducers } from '../redux/userSlice';
import { MOVIE_UPDATE_TYPE, USER_TYPE } from '../utils/enums';
import formatDate from '../utils/formatDate';

const intialUser = { name: "", bio: "", gender: "", dob: "", type: "" }
const intialMovie = { name: "", plot: "", poster: "", release_date: "", producer: "", actors: [] }

const CreateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedActors, setSelectedActors] = useState([])
    const [modalData, setModalData] = useState({})
    const [mode, setMode] = useState(MOVIE_UPDATE_TYPE.CREATE)
    const [user, setUser] = useState(intialUser)
    const [formData, setFormData] = useState(intialMovie);
    const { movie } = useSelector((state) => state.movie);
    const { producers, actors, status } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllProducers());
            dispatch(fetchAllActors());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (id) {
            setMode(MOVIE_UPDATE_TYPE.UPDATE);
            dispatch(fetchMovie(id))
        } else {
            setFormData(intialMovie)
        }
    }, [id])

    useEffect(() => {
        if (!movie || mode !== MOVIE_UPDATE_TYPE.UPDATE) return

        const { name, plot, poster, release_date } = movie
        setFormData({ name, plot, poster, release_date, producer: movie.producer?.id.toString(), release_date: formatDate(movie.release_date) })
        setSelectedActors(movie.actors?.map((actor) => actor.id))
    }, [movie])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...formData, actors: selectedActors }
        const navigateFunc = () => navigate(-1)
        const payload = { data, navigate: navigateFunc }

        if (mode === MOVIE_UPDATE_TYPE.CREATE) dispatch(createMovie(payload));
        else dispatch(updateMovie({ id, ...payload }));
    };

    const handleActorClick = (actorId) => {
        const actor = selectedActors?.find((actor) => actor === actorId)

        if (actor) {
            const actors = [...selectedActors]
            actors.splice(selectedActors.indexOf(actor), 1)
            setSelectedActors(actors)
        } else {
            setSelectedActors([...selectedActors, actorId])
        }
    }

    const handleAddNewUserClick = (type) => {
        if (!type) return
        setModalData({ open: true, type, title: <div>Add New <span className='capitalize'>{type}</span></div> })
        setUser(intialUser)
    }

    return (
        <div id='create-movie'>
            <div>
                <h1 className='text-3xl font-bold text-center mb-3'>{mode === MOVIE_UPDATE_TYPE.CREATE ? 'Create Movie' : `Update ${movie?.name}`}</h1>
                <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Movie Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Plot</label>
                            <textarea
                                name="plot"
                                placeholder="Enter Movie Plot"
                                value={formData.plot}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Poster URL</label>
                            <input
                                type="url"
                                name="poster"
                                value={formData.poster}
                                onChange={handleChange}
                                placeholder="Enter Movie Poster URL"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Release Date *</label>
                            <input
                                type="date"
                                name="release_date"
                                value={formData.release_date}
                                onChange={handleChange}
                                placeholder="Select Movie Release Date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <div className='flex justify-between'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Producer *</label>
                                <label onClick={() => handleAddNewUserClick(USER_TYPE.PRODUCER)} className="block text-sm font-medium text-blue-700 mb-2 cursor-pointer">Add New</label>
                            </div>

                            <select
                                name="producer"
                                placeholder="Select Movie Producer"
                                value={formData.producer}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option></option>
                                {producers.map((producer) => <option value={producer.id} key={producer.id}>{producer.name}</option>)}
                            </select>
                        </div>

                        <div className="mb-4">
                            <div className='flex justify-between'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Actors * (click to select)</label>
                                <label onClick={() => handleAddNewUserClick(USER_TYPE.ACTOR)} className="block text-sm font-medium text-blue-700 mb-2 cursor-pointer">Add New</label>
                            </div>

                            <div className='max-h-64 overflow-y-scroll'>
                                {actors.map((actor) => <div onClick={() => handleActorClick(actor.id)} className={`cursor-pointer p-2 mb-2 border flex items-center ${!!selectedActors?.includes(actor.id) ? 'bg-blue-500 text-white' : ''}`} key={actor.id}>{actor.name}<div></div></div>)}
                            </div>
                        </div>

                        <div className='flex justify-end mt-10'>
                            <button
                                type='button'
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 text-gray-500 border mr-3 border-gray-500 rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {mode === MOVIE_UPDATE_TYPE.CREATE ? 'Create' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {modalData.open && <CreateUser modalData={modalData} setModalData={setModalData} user={user} setUser={setUser} />}
        </div>
    );
};

export default CreateMovie;