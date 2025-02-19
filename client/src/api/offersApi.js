import axios from "axios";

// Get all offers for a user
export const getUserOffers = async (offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.get("/offers/my-offers");
    console.log("getUserOffers Response:", response.data);
    offersDispatch({
      type: "GET_USER_OFFERS",
      payload: {
        userOffers: response.data.userOffers,
        totalOffers: response.data.totalOffers,
      },
    });
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

// Post an offer
export const postOffer = async (requestId, message, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.post(`/offers/${requestId}`, { message });
    console.log("postOffer Response:", response.data);

    offersDispatch({
      type: "POST_OFFER",
      payload: { data: response.data.data },
    });
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

// Get all offers for a specific request
export const getAllOffersOnARequest = async (requestId, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.get(`/offers/${requestId}`);
    console.log("getAllOffersOnARequest Response:", response.data);
    offersDispatch({
      type: "GET_ALL_OFFERS_ON_A_REQUEST",
      payload: {
        offers: response.data.offers,
        totalOffers: response.data.totalOffers,
      },
    });
  } catch (error) {
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload:
        error.response?.data?.message ||
        "Failed to get offers for this request.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

// Cancel own offer
export const cancelOffer = async (offerId, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.delete(`/offers/cancel/${offerId}`);
    console.log("cancelOffer Response:", response.data);
    offersDispatch({
      type: "CANCEL_OFFER",
      payload: { deletedOffer: response.data.deletedOffer },
    });
  } catch (error) {
    console.log("postOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to cancel offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

// Reject an offer (as request owner)
export const rejectOffer = async (offerId, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.delete(`/offers/reject/${offerId}`);
    console.log("rejectOffer Response:", response.data);
    offersDispatch({
      type: "REJECT_OFFER",
      payload: {
        rejectedOffer: response.data.rejectedOffer,
        requestOwner: response.data.requestOwner,
      },
    });
  } catch (error) {
    console.log("getAllOffersOnARequest Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to reject offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

// Update an existing offer
export const updateOffer = async (offerId, message, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.patch(`/offers/${offerId}`, { message });
    console.log("updateOffer Response:", response.data);
    offersDispatch({
      type: "UPDATE_OFFER",
      payload: { updatedOffer: response.data.updatedOffer },
    });
  } catch (error) {
    console.log("cancelOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to update offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};

// Accept an offer (as request owner)
export const acceptOffer = async (offerId, offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.patch(`/offers/accept/${offerId}`);
    console.log("acceptOffer Response:", response.data);
    offersDispatch({
      type: "ACCEPT_OFFER",
      payload: { updatedRequest: response.data.updatedRequest },
    });
  } catch (error) {
    console.log("rejectOffer Error:", error.response.data);
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to accept offer.",
    });
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};
