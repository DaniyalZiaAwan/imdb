import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { deleteMovie, fetchMovies, setCurrentPage } from '../redux/movieSlice';

const initialConfirmation = { show: false, item: { id: null, label: '' } }
const thClass = 'px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b'
const tdClass = 'px-4 py-4 text-sm text-gray-700 border-b'

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(initialConfirmation)
  const { movies, status, loading, currentPage, totalPages } = useSelector((state) => state.movie);

  useEffect(() => {
    // fetch paginated movies
    if (status === 'idle') dispatch(fetchMovies());
  }, [status, dispatch]);

  useEffect(() => {
    // fetch movies when page changes (pagination)
    dispatch(fetchMovies(currentPage));
  }, [currentPage]);

  const handleCancel = () => {
    setConfirmation(initialConfirmation)
  }

  const handleDelete = async () => {
    // send API call to delete movie
    await dispatch(deleteMovie(confirmation.item.id))
    dispatch(fetchMovies());
    handleCancel()
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  }

  const navigateToEdit = (id) => {
    navigate(`/edit/${id}`)
  }

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
        {(!loading && movies?.length) ?
          (
            <div>
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className={thClass}>Poster</th>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Plot</th>
                    <th className={thClass}>Release Date</th>
                    <th className={thClass}>Producer</th>
                    <th className={thClass}>Actors</th>
                    <th className={thClass}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-gray-50">
                      <td className={tdClass}>{movie.poster && <img src={movie.poster} className='w-[100px] h-[100px] object-cover' />}</td>
                      <td className={tdClass}>{movie.name}</td>
                      <td className={`${tdClass} max-w-xs`}>{movie.plot}</td>
                      <td className={tdClass}>{new Date(movie.release_date).toLocaleDateString('en-US')}</td>
                      <td className={tdClass}>{movie.producer?.name}</td>
                      <td className={`${tdClass} max-w-xs`}>{movie.actors?.map((actor) => actor.name).join(', ')}</td>
                      <td lassName={tdClass}>
                        <button onClick={() => (navigateToEdit(movie.id))} class="mr-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
          ) : <div className='text-center'>No Movies found, can add by clicking the add movie button above.</div>
        }
      </div>
    </div>
  );
};

export default MovieList;