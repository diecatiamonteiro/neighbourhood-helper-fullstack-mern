export const offersInitialState = {
  offers: [], // All offers on a specific request
  userOffers: [], // Logged-in user's offers
  totalOffers: 0,
  deletedOffer: null,
  rejectedOffer: null,
  requestOwner: null, // For reject offer response
  updatedOffer: null,
  updatedRequest: null, // For accept offer response
  isLoading: false,
  error: null,
};

export const offersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_OFFERS":
      return {
        ...state,
        userOffers: action.payload.userOffers || [],
        totalOffers: action.payload.totalOffers,
        error: null,
      };

    case "POST_OFFER":
      return {
        ...state,
        offers: [...state.offers, action.payload.data],
        error: null,
      };

    case "GET_ALL_OFFERS_ON_A_REQUEST":
      return {
        ...state,
        offers: action.payload.offers,
        totalOffers: action.payload.totalOffers,
        error: null,
      };

    case "CANCEL_OFFER":
      return {
        ...state,
        deletedOffer: action.payload.deletedOffer,
        offers: state.offers.filter(
          (offer) => offer._id !== action.payload.deletedOffer._id
        ), // Filters out the deleted offer from the offers array
        totalOffers: state.totalOffers - 1,
        error: null,
      };

    case "REJECT_OFFER":
      return {
        ...state,
        rejectedOffer: action.payload.rejectedOffer,
        requestOwner: action.payload.requestOwner,
        offers: state.offers.filter(
          (offer) => offer._id !== action.payload.rejectedOffer._id
        ), // Filters out the rejected offer from the offers array
        totalOffers: state.totalOffers - 1,
        error: null,
      };

    case "UPDATE_OFFER":
      return {
        ...state,
        updatedOffer: action.payload.updatedOffer,
        offers: state.offers.map((offer) =>
          offer._id === action.payload.updatedOffer._id
            ? action.payload.updatedOffer
            : offer
        ),
        error: null,
      };

    case "ACCEPT_OFFER":
      return {
        ...state,
        updatedRequest: action.payload.updatedRequest,
        error: null,
      };

    case "SET_LOADING_OFFERS":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR_OFFERS":
      return {
        ...state,
        error: action.payload,}

    default:
      return state;
  }
};
