import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import appReducer from "./app";
import bondsReducer from "./bonds";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bonds: bondsReducer,
    app: appReducer,
  },
});

/** Type helpers */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
