import axios from "axios";

// Get all offers for a user
export const getUserOffers = async (offersDispatch) => {
  offersDispatch({ type: "SET_LOADING_OFFERS", payload: true });
  try {
    const response = await axios.get("/offers/my-offers");
    offersDispatch({
      type: "GET_USER_OFFERS",
      payload: {
        userOffers: response.data.userOffers,
        totalOffers: response.data.totalOffers,
      },
    });
  } catch (error) {
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

    offersDispatch({
      type: "POST_OFFER",
      payload: { data: response.data.data },
    });
  } catch (error) {
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
    offersDispatch({
      type: "CANCEL_OFFER",
      payload: { deletedOffer: response.data.deletedOffer },
    });
  } catch (error) {
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
    offersDispatch({
      type: "REJECT_OFFER",
      payload: {
        rejectedOffer: response.data.rejectedOffer,
        requestOwner: response.data.requestOwner,
      },
    });
  } catch (error) {
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
    offersDispatch({
      type: "UPDATE_OFFER",
      payload: { updatedOffer: response.data.updatedOffer },
    });
  } catch (error) {
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
    
    // Make sure we're getting the helper's username from the response
    const helperUsername = response.data.helperUsername || 'the helper';
    
    offersDispatch({
      type: "ACCEPT_OFFER",
      payload: { 
        updatedRequest: response.data.updatedRequest,
        helperUsername: helperUsername
      },
    });
    return { success: true, helperUsername: helperUsername };
  } catch (error) {
    offersDispatch({
      type: "SET_ERROR_OFFERS",
      payload: error.response?.data?.message || "Failed to accept offer.",
    });
    return { success: false, error: error.response?.data?.message };
  } finally {
    offersDispatch({ type: "SET_LOADING_OFFERS", payload: false });
  }
};
