import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { deleteMovie, fetchMovies, setCurrentPage } from '../redux/movieSlice';
import { fetchAllProducers } from '../redux/userSlice';

const initialConfirmation = { show: false, item: { id: null, label: '' } }
const initialSearch = { name: '', producer: '' }
const thClass = 'px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b'
const tdClass = 'px-4 py-4 text-sm text-gray-700 border-b'

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(initialConfirmation)
  const [search, setSearch] = useState({...initialSearch})
  const { movies, status, loading, currentPage, totalPages } = useSelector((state) => state.movie);
  const { producers } = useSelector((state) => state.user);

  console.log(loading)

  useEffect(() => {
    // fetch paginated movies & all producers
    if (status === 'idle') {
      dispatch(fetchMovies());
      dispatch(fetchAllProducers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // fetch movies when page changes (pagination)
    dispatch(fetchMovies({ page: currentPage }));
  }, [currentPage]);

  const handleCancel = () => {
    setConfirmation(initialConfirmation)
  }

  const handleDelete = async () => {
    // send API call to delete movie
    await dispatch(deleteMovie(confirmation.item.id))
    dispatch(fetchMovies({ page: 1 }));
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

  const navigateToDetails = (id) => {
    navigate(`/movie/${id}`)
  }

  const handleChange = (e) => {
    // update state when data entered in form by user
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSearch = () => {
    dispatch(fetchMovies({ page: currentPage, ...search }));
  }

  const handleReset = () => {
    setSearch({...initialSearch})
    dispatch(fetchMovies({ page: 1 }));
  }

  return (
    <div id='movie-list'>
      <h1 className='text-3xl font-bold text-center mb-3'>Movies</h1>
      <div className='flex flex-wrap gap-4 justify-between py-2'>
        <div>
          <div className='flex flex-wrap justify-start items-center'>
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-1'>Name</label>
              <input
                type="text"
                name='name'
                value={search.name}
                onChange={handleChange}
                className="h-[35px] w-[200px] px-4 py-2 mr-5 mb-5 rounded border-r-8 border-transparent outline outline-gray-300"
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-1'>Producer</label>
              <select
                name="producer"
                value={search.producer}
                onChange={handleChange}
                className="h-[35px] w-[200px] px-4 py-2 mr-5 mb-5 rounded border-r-8 border-transparent outline outline-gray-300"
              >
                <option></option>
                {producers.map((producer) => <option value={producer.id} key={producer.id}>{producer.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <button type='button' onClick={handleSearch} class="px-3 py-2 mr-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Search
            </button>
            <button
              type='button'
              onClick={handleReset}
              className="px-3 py-2 text-gray-500 border mr-3 border-gray-500 rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <Link to={'/create'}>
            <button class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Add Movie
            </button>
          </Link>
        </div>
      </div>

      {confirmation.show && <ConfirmationModal data={confirmation} onCancel={handleCancel} onConfirm={handleDelete} />}

      <div className="overflow-x-auto mt-4">
        {loading && <Loader />}
        {!loading && !movies.length && <div className='text-center'>No Movies found, can add by clicking the add movie button above.</div>}
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
                        <div className='flex flex-wrap gap-2'>
                        <button onClick={() => (navigateToEdit(movie.id))} class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                          Edit
                        </button>
                        <button onClick={() => setConfirmation({ show: true, item: { id: movie.id, label: movie.name } })} class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                          Delete
                        </button>
                        <button onClick={() => navigateToDetails(movie.id)} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-3 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                          Details
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
          ) : ''
        }
      </div>
    </div>
  );
};

export default MovieList;