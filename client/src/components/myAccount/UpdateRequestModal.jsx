import React from "react";

export default function UpdateRequestModal({
  showUpdateRequestModal,
  setShowUpdateRequestModal,
  updateRequest,
  setUpdateRequest,
  handleUpdateRequest,
}) {
  if (!showUpdateRequestModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 min-w-full">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-charcoal mb-4">Edit Request</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdateRequest(updateRequest.id, {
            category: updateRequest.category,
            description: updateRequest.description,
            when: updateRequest.when
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={updateRequest.category}
                onChange={(e) =>
                  setUpdateRequest((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Errands">Errands</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
                <option value="Household">Household</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Childcare">Childcare</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Tech Support">Tech Support</option>
                <option value="Moving">Moving</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={updateRequest.description}
                onChange={(e) =>
                  setUpdateRequest((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Describe what you need help with..."
              />
            </div>
            <div>
          <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">
            When do you need help?
          </label>
          <input
                type="datetime-local"
                id="when"
                name="when"
                value={updateRequest.when}
                onChange={(e) =>
                  setUpdateRequest((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowUpdateRequestModal(false);
                setUpdateRequest({
                  category: "",
                  description: "",
                  when: "",
                });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-olive hover:bg-oliveHover text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
