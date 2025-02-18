import { createContext, useEffect, useReducer } from "react";
import { usersInitialState, usersReducer } from "../reducers/usersReducer";
import { getUserData } from "../api/usersApi";
import {
  requestsInitialState,
  requestsReducer,
} from "../reducers/requestsReducer";
import { offersInitialState, offersReducer } from "../reducers/offersReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  const [requestsState, requestsDispatch] = useReducer(
    requestsReducer,
    requestsInitialState
  );

  const [offersState, offersDispatch] = useReducer(
    offersReducer,
    offersInitialState
  );

  useEffect(() => {
    getUserData(usersDispatch);
  }, []); // Executes once when the component mounts. Gets the user data allowing the user to be logged in, even if page is refreshed.

  return (
    <DataContext.Provider
      value={{
        usersState,
        usersDispatch,
        requestsState,
        requestsDispatch,
        offersState,
        offersDispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
