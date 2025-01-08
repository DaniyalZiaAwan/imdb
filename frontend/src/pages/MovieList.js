import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import { deleteMovie, fetchMovies, setCurrentPage } from '../redux/movieSlice';
import Pagination from '../components/Pagination';

const initialConfirmation = { show: false, item: { id: null, label: '' } }

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(initialConfirmation)
  const { movies, status, loading, currentPage, totalPages } = useSelector((state) => state.movie);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMovies());
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [currentPage]);

  const handleCancel = () => {
    setConfirmation(initialConfirmation)
  }

  const handleDelete = async () => {
    await dispatch(deleteMovie(confirmation.item.id))
    dispatch(fetchMovies());
    handleCancel()
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  return (
    <div id='movie-list'>
      <h1 className='text-3xl font-bold text-center mb-3'>Movies</h1>
      <div className='text-right py-2'>
        <Link to={'/create'}>
          <button class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add Movie
          </button>
        </Link>
      </div>

      {confirmation.show && <ConfirmationModal data={confirmation} onCancel={handleCancel} onConfirm={handleDelete} />}

      <div className="overflow-x-auto mt-4">
        {loading && <Loader />}
        {!loading &&
          (
            <div>
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Poster</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Plot</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Release Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Producer</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Actors</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-700 border-b">
                        {movie.poster && <img src={movie.poster} className='w-[100px] h-[100px] object-cover' />}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b">{movie.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b max-w-xs">{movie.plot}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b">{new Date(movie.release_date).toLocaleDateString('en-US')}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b">{movie.producer?.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b">
                        {movie.actors?.map((actor) => actor.name).join(', ')}
                      </td>
                      <td>
                        <button onClick={() => navigate(`/edit/${movie.id}`)} class="mr-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                          Edit
                        </button>
                        <button onClick={() => setConfirmation({ show: true, item: { id: movie.id, label: movie.name } })} class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MovieList;