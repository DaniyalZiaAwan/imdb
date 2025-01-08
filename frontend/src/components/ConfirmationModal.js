
const ConfirmationModal = ({ data, onCancel, onConfirm }) => {
    return (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 class="text-lg font-semibold text-gray-800">Delete Confirmation</h2>
                <p class="text-gray-600 mt-2">
                    Are you sure you want to delete <b>{data.item.label}</b>?
                </p>

                <div class="flex justify-end space-x-4 mt-4">
                    <button
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;