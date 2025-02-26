import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { DataContext } from "../contexts/Context";
import { getUserData } from "../api/usersApi";
import {
  getUserRequests,
  deleteRequest,
  updateRequest as updateRequestApi,
  getAllRequests,
} from "../api/requestsApi";
import { acceptOffer, getUserOffers, rejectOffer } from "../api/offersApi";
import { updateUserData, deleteUser } from "../api/usersApi";
import UserInformation from "../components/myAccount/UserInformation";
import MyRequests from "../components/myAccount/MyRequests";
import MyOffers from "../components/myAccount/MyOffers";
import UpdateProfileModal from "../components/myAccount/UpdateProfileModal";
import UpdatePasswordModal from "../components/myAccount/UpdatePasswordModal";
import DeleteAccountModal from "../components/myAccount/DeleteAccountModal";
import UpdateRequestModal from "../components/myAccount/UpdateRequestModal";
import DeleteRequestModal from "../components/myAccount/DeleteRequestModal";

export default function MyAccount() {
  const {
    usersState,
    usersDispatch,
    requestsState,
    requestsDispatch,
    offersState,
    offersDispatch,
  } = useContext(DataContext);

  // Separate modals for different actions
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showUpdateRequestModal, setShowUpdateRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [updateRequest, setUpdateRequest] = useState({
    description: "",
    category: "",
    when: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await getUserData(usersDispatch);
      await getUserRequests(requestsDispatch);
      await getUserOffers(offersDispatch);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showUpdateModal && usersState.user?.user) {
      setUpdateFormData({
        username: usersState.user.user.username,
        firstName: usersState.user.user.firstName,
        lastName: usersState.user.user.lastName,
        email: usersState.user.user.email,
        zipCode: usersState.user.user.zipCode,
      });
    }
  }, [showUpdateModal, usersState.user]); // When update modal is open && user data changes, update form data with users's current info

  if (
    usersState.isLoading ||
    requestsState.isLoading ||
    offersState.isLoading
  ) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (usersState.error || requestsState.error || offersState.error) {
    return (
      <div className="flex justify-center items-center">
        Error: {usersState.error || requestsState.error || offersState.error}
      </div>
    );
  }

  const handleAcceptHelp = async (offerId) => {
    const result = await acceptOffer(offerId, offersDispatch);

    if (result.success) {
      await getUserOffers(offersDispatch);
      await getUserRequests(requestsDispatch);

      toast.success(
        `We will notify ${result.helperUsername} that you've accepted their help!`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      console.error("Failed to accept offer:", result.error);
      toast.error("Failed to accept offer. Please try again.");
    }
  };

  const handleRejectHelp = async (offerId) => {
    try {
      await rejectOffer(offerId, offersDispatch);
      await getUserRequests(requestsDispatch); // Refresh the requests to update the status
      toast.success("Offer rejected successfully");
    } catch (error) {
      toast.error("Failed to reject offer. Please try again.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserData(usersDispatch, updateFormData);
      if (response?.success) {
        // Add check for successful response
        setShowUpdateModal(false);
        // Force a refresh of user data to ensure state is in sync
        await getUserData(usersDispatch);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordFormData.password !== passwordFormData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await updateUserData(usersDispatch, {
        password: passwordFormData.password,
      });
      setShowPasswordModal(false);
      setPasswordFormData({ password: "", confirmPassword: "" });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(usersDispatch);
      toast.success("Account deleted successfully");
      window.location.href = "/"; // Redirect to homepage after successful deletion
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteRequest(requestsDispatch, requestId);
      await getUserRequests(requestsDispatch); // Refresh the requests list after deletion
      setShowDeleteRequestModal(false);  
      setRequestToDelete(null);  
      toast.success("Request deleted successfully");
    } catch (error) {
      toast.error("Failed to delete request. Please try again.");
    }
  };

  const handleUpdateRequest = async (requestId, updatedData) => {
    try {
      await updateRequestApi(requestsDispatch, requestId, updatedData);

      // Refresh both user requests and all requests
      await getUserRequests(requestsDispatch);
      await getAllRequests(requestsDispatch);

      setShowUpdateRequestModal(false);
      toast.success("Request updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update request. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-offwhite/80 backdrop-blur-sm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
            My Account
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center min-h-[580px]">
            <UserInformation
              user={usersState.user?.user}
              setShowUpdateModal={setShowUpdateModal}
              setShowPasswordModal={setShowPasswordModal}
              setShowDeleteAccountModal={setShowDeleteAccountModal}
            />

            <MyRequests
              requests={requestsState.userRequests}
              handleAcceptHelp={handleAcceptHelp}
              handleRejectHelp={handleRejectHelp}
              handleDeleteRequest={handleDeleteRequest}
              handleUpdateRequest={handleUpdateRequest}
              requestsDispatch={requestsDispatch}
              setUpdateRequest={setUpdateRequest}
              setShowUpdateRequestModal={setShowUpdateRequestModal}
              setShowDeleteRequestModal={setShowDeleteRequestModal}
              setRequestToDelete={setRequestToDelete}
            />

            <MyOffers offers={offersState.userOffers} />
          </div>
        </div>
      </div>

      <UpdateProfileModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        updateFormData={updateFormData}
        setUpdateFormData={setUpdateFormData}
        handleUpdateProfile={handleUpdateProfile}
      />

      <UpdatePasswordModal
        showPasswordModal={showPasswordModal}
        setShowPasswordModal={setShowPasswordModal}
        passwordFormData={passwordFormData}
        setPasswordFormData={setPasswordFormData}
        handlePasswordChange={handlePasswordChange}
      />

      <DeleteAccountModal
        showDeleteAccountModal={showDeleteAccountModal}
        setShowDeleteAccountModal={setShowDeleteAccountModal}
        handleDeleteAccount={handleDeleteAccount}
      />

      <UpdateRequestModal
        showUpdateRequestModal={showUpdateRequestModal}
        setShowUpdateRequestModal={setShowUpdateRequestModal}
        updateRequest={updateRequest}
        setUpdateRequest={setUpdateRequest}
        handleUpdateRequest={handleUpdateRequest}
      />

      <DeleteRequestModal
        showDeleteRequestModal={showDeleteRequestModal}
        setShowDeleteRequestModal={setShowDeleteRequestModal}
        handleDeleteRequest={handleDeleteRequest}
        requestId={requestToDelete}
      />
    </div>
  );
}
