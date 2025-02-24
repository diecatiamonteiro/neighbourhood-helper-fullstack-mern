import React from "react";

export default function UpdatePasswordModal({
  showPasswordModal,
  setShowPasswordModal,
  passwordFormData,
  setPasswordFormData,
  handlePasswordChange,
}) {
  if (!showPasswordModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 min-w-full">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-charcoal mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={passwordFormData.password}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
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
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordFormData.confirmPassword}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setShowPasswordModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-olive hover:bg-oliveHover text-white px-6 py-2 rounded-lg font-semibold"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
