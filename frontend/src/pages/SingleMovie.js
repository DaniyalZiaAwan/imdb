import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../redux/movieSlice";
import Loader from "../components/Loader";

const SingleMovie = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { movie, loading } = useSelector((state) => state.movie);

    useEffect(() => {
        if (id) {
            dispatch(fetchMovie(id))
        }
    }, [id])

    if (loading) return <Loader />
    if (!movie) return

    return (
        <div>
            <button onClick={() => navigate(-1)} className="px-3 py-1 mb-3 text-gray-500 border mr-3 border-gray-500 rounded-md hover:bg-gray-500 hover:text-white transition duration-300">Back</button>
            <div className="flex flex-col sm:flex-row">
                <img class="object-cover w-1/1 sm:w-1/2 rounded-t-lg h-96 md:rounded-none md:rounded-s-lg" src={movie.poster} alt={movie.name} />
                <div class="flex flex-col w-1/1 sm:w-1/2 pt-5 sm:pt-0 sm:pl-5">
                    <h5 class="mb-2 text-3xl font-bold">{movie.name}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 mb-10">{movie.plot}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">Release Date: {new Date(movie.release_date).toLocaleDateString('en-US')}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">Producer: {movie.producer?.name}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-700">Actors: {movie.actors?.map((actor) => actor.name).join(', ')}</p>
                </div>
            </div>
        </div>

    )
}

export default SingleMovie