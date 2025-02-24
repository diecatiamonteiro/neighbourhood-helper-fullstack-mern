import React from "react";

export default function UpdateProfileModal({
  showUpdateModal,
  setShowUpdateModal,
  updateFormData,
  setUpdateFormData,
  handleUpdateProfile,
}) {
  if (!showUpdateModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 min-w-full">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-charcoal mb-4">Update Profile</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={updateFormData.username}
                onChange={(e) =>
                  setUpdateFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={updateFormData.firstName}
                onChange={(e) =>
                  setUpdateFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={updateFormData.lastName}
                onChange={(e) =>
                  setUpdateFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={updateFormData.email}
                onChange={(e) =>
                  setUpdateFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <select
                name="zipCode"
                value={updateFormData.zipCode}
                onChange={(e) =>
                  setUpdateFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="04177 Lindenau, Alt-Lindenau, Neu-Lindenau">
                  04177
                </option>
                <option value="04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen">
                  04178
                </option>
                <option value="04179 Leutzsch">04179</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
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
