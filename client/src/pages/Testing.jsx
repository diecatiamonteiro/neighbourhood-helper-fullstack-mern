import { useContext } from "react";
import { DataContext } from "../contexts/Context";
import {
  deleteUser,
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData,
} from "../api/usersApi";
import {
  createRequest,
  deleteRequest,
  getAllRequests,
  getSpecificRequest,
  getUserRequests,
  updateRequest,
} from "../api/requestsApi";
import {
  cancelOffer,
  getAllOffersOnARequest,
  getUserOffers,
  postOffer,
  rejectOffer,
  updateOffer,
} from "../api/offersApi";

export const Testing = () => {
  const { usersDispatch, requestsDispatch, offersDispatch } =
    useContext(DataContext);

  const registerFormData = {
    username: "testUser7",
    firstName: "testUSer",
    lastName: "7",
    email: "tu7@a.com",
    password: "123",
    zipCode: "04178 Böhlitz-Ehrenberg, Rückmarsdorf, Burghausen",
  };

  const loginFormData = {
    email: "tu7@a.com",
    password: "123",
  };

  const updateFormData = {
    username: "testUser7Updated",
  };

  const requestData = {
    description: "This is a test request.",
    category: "Errands",
    when: "Test Today",
  };

  const updateRequestData = {
    when: "Test Tomorrow",
  };

  const updateOfferData = {
    message: "I can do that. Test updated.",
  };

  const offerData = {
    helperId: "67b33f7ce2cfda5c2610593a",
    message: "I can do that. Test.",
  };

  return (
    <div>
      <h2>Testing Users API</h2>
      <button onClick={() => registerUser(usersDispatch, registerFormData)}>
        Register
      </button>
      <button onClick={() => loginUser(usersDispatch, loginFormData)}>
        Login
      </button>
      <button onClick={() => logoutUser(usersDispatch)}>Logout</button>
      <button onClick={() => getUserData(usersDispatch)}>Get User Data</button>
      <button onClick={() => updateUserData(usersDispatch, updateFormData)}>
        Update User Data
      </button>
      <button onClick={() => deleteUser(usersDispatch)}>Delete User</button>

      <h2>Testing Requests API</h2>
      <button onClick={() => getAllRequests(requestsDispatch)}>
        Get All Requests
      </button>
      <button
        onClick={() =>
          getSpecificRequest(requestsDispatch, "67acb570526ea42d85d8b3f8")
        }
      >
        Get Specific Request
      </button>
      <button onClick={() => getUserRequests(requestsDispatch)}>
        Get User Requests
      </button>
      <button onClick={() => createRequest(requestsDispatch, requestData)}>
        Create Request
      </button>
      <button
        onClick={() =>
          updateRequest(
            requestsDispatch,
            "67b34222e2cfda5c2610594c",
            updateRequestData
          )
        }
      >
        Update Request
      </button>
      <button
        onClick={() =>
          deleteRequest(requestsDispatch, "67b341a2e2cfda5c26105945")
        }
      >
        Delete Request
      </button>

      <h2>Testing Offers API</h2>
      <button
        onClick={() => {
          getUserOffers(offersDispatch);
        }}
      >
        Get User Offers
      </button>
      <button
        onClick={() => {
          postOffer(offersDispatch, "67acb570526ea42d85d8b406", offerData);
        }}
      >
        Post Offer
      </button>
      <button
        onClick={() => {
          updateOffer(
            offersDispatch,
            "67b4475be2cfda5c261059b4",
            updateOfferData
          );
        }}
      >
        Update Offer
      </button>

      <button
        onClick={() => {
          getAllOffersOnARequest(offersDispatch, "67acb570526ea42d85d8b406");
        }}
      >
        Get All Offers on a Request
      </button>
      <button
        onClick={() => {
          cancelOffer(offersDispatch, "67b444bce2cfda5c26105983");
        }}
      >
        Cancel Offer
      </button>
      <button
        onClick={() => {
          rejectOffer(offersDispatch, "67b445c4e2cfda5c26105998");
        }}
      >
        Reject Offer
      </button>
    </div>
  );
};
