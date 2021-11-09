import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import bondsReducer from "./bonds";
import appReducer from "./app";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bonds: bondsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
