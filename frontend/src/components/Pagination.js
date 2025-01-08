
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-2 mx-1 text-gray-500 bg-white border rounded hover:bg-gray-100"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    className={`px-3 py-2 mx-1 border rounded ${currentPage === page + 1
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-500 border-gray-300'
                        }`}
                >
                    {page + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-2 mx-1 text-gray-500 bg-white border rounded hover:bg-gray-100"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination