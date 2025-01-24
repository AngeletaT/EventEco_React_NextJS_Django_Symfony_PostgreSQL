import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";

const store_p = configureStore({
    reducer: {
        error: errorReducer,
    },
});

export type RootState = ReturnType<typeof store_p.getState>;
export type AppDispatch = typeof store_p.dispatch;

export default store_p;
