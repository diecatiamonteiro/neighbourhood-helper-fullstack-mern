export default function DeleteRequestModal({
    showDeleteRequestModal,
    setShowDeleteRequestModal,
    handleDeleteRequest,
    requestId
}) {
    if (!showDeleteRequestModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold text-charcoal mb-4">Delete Request</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this request? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowDeleteRequestModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteRequest(requestId)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Delete Request
            </button>
          </div>
        </div>
      </div>
    );
}
