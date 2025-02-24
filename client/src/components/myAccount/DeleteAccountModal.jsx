import React from "react";

export default function DeleteAccountModal({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteAccount,
}) {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-charcoal mb-4">Delete Account</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
