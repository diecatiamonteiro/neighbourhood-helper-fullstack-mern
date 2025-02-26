import React from "react";

export default function UserInformation({
  user,
  setShowUpdateModal,
  setShowPasswordModal,
  setShowDeleteAccountModal,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
          User Information
        </h2>
        {user && (
          <div className="flex flex-col h-full">
            <div className="space-y-2 text-left">
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">First Name:</span>{" "}
                {user.firstName}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span>{" "}
                {user.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Zip Code:</span> {user.zipCode}
              </p>
              <p>
                <span className="font-semibold">Member Since:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Update & Delete Account */}
            <div className="mt-auto pt-6 space-y-2">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full bg-olive text-white px-4 py-2 rounded-md hover:bg-oliveHover transition-colors duration-200"
              >
                Update Profile
              </button>
            </div>

            <div className="border-t border-gray-200 pt-2 mt-6">
              <p className="text-sm text-gray-600 mb-2">Account Settings</p>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors mb-2 duration-200"
              >
                Change Password
              </button>
              <button
                onClick={() => setShowDeleteAccountModal(true)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
