import React from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchAllActors, fetchAllProducers } from '../redux/userSlice';
import { USER_TYPE } from '../utils/enums';

const CreateUser = ({ modalData, setModalData, user, setUser }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        await dispatch(createUser({ data: { ...user, type: modalData.type }, setModalData: () => setModalData({ open: false }) }));
        dispatch(modalData.type === USER_TYPE.PRODUCER ? fetchAllProducers() : fetchAllActors())
    }

    return (
        <div
            id="create-user"
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
        >
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-lg font-bold text-gray-700">{modalData.title}</h2>
                    <button onClick={() => setModalData({ open: false })} id="closeModal" className="text-gray-500 hover:text-gray-700">
                        ✖
                    </button>
                </div>

                <div className="p-4">
                    <form onSubmit={handleCreateUser}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter User Name"
                                value={user.name}
                                onChange={(e) => handleChange(e, 'user')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea
                                type="text"
                                name="bio"
                                placeholder="Enter User Bio"
                                value={user.bio}
                                onChange={(e) => handleChange(e, 'user')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                name="gender"
                                placeholder="Select User Gender"
                                value={user.gender}
                                onChange={(e) => handleChange(e, 'user')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option></option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={(e) => handleChange(e, 'user')}
                                placeholder="Select User Date of Birth"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className='flex justify-end p-4'>
                            <button
                                onClick={() => setModalData({ open: false })}
                                className="px-4 py-2 text-gray-500 border mr-3 border-gray-500 rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;