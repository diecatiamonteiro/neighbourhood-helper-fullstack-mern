import axios from "axios";

export const getUserOffers = async (offersDispatch) => {
  try {
    const response = await axios.get("/offers/my-offers");
    console.log("getUserOffers Response:", response.data);
    offersDispatch({ type: "GET_USER_OFFERS", payload: response.data });
  } catch (error) {
    console.log("getUserOffers Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to get user offers.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

export const postOffer = async (offersDispatch, requestId, offerData) => {
  try {
    const response = await axios.post(`/offers/${requestId}`, offerData);
    console.log("postOffer Response:", response.data);
    offersDispatch({ type: "POST_OFFER", payload: response.data });
  } catch (error) {
    console.log("postOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to post offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

//! create a new controller receiveHelp so i can fetch all offers a user received on dashboad for eg

export const updateOffer = async (offersDispatch, offerId, offerData) => {
  try {
    const response = await axios.patch(`/offers/${offerId}`, offerData);
    console.log("updateOffer Response:", response.data);
    offersDispatch({ type: "UPDATE_OFFER", payload: response.data });
  } catch (error) {
    console.log("postOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to update offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

export const getAllOffersOnARequest = async (offersDispatch, requestId) => {
  try {
    const response = await axios.get(`/offers/${requestId}`);
    console.log("getAllOffersOnARequest Response:", response.data);
    offersDispatch({
      type: "GET_ALL_OFFERS_ON_A_REQUEST",
      payload: response.data,
    });
  } catch (error) {
    console.log("getAllOffersOnARequest Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload:
        error.response?.data?.message ||
        "Failed to get all offers on this request.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

export const cancelOffer = async (offersDispatch, offerId) => {
  try {
    const response = await axios.delete(`/offers/cancel/${offerId}`);
    console.log("cancelOffer Response:", response.data);
    offersDispatch({
      type: "CANCEL_OFFER",
      payload: response.data,
    });
  } catch (error) {
    console.log("cancelOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to cancel offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

export const rejectOffer = async (offersDispatch, offerId) => {
  try {
    const response = await axios.delete(`/offers/reject/${offerId}`);
    console.log("rejectOffer Response:", response.data);
    offersDispatch({
      type: "REJECT_OFFER",
      payload: response.data,
    });
  } catch (error) {
    console.log("rejectOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to reject offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};
