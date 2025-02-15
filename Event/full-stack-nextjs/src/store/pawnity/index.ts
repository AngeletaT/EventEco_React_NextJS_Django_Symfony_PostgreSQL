import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "@/store/pawnity/slices/errorSlice";
import authReducer from "@/store/pawnity/slices/authSlice";
import userReducer from "@/store/pawnity/slices/userSlice";

const store = configureStore({
    reducer: {
        error: errorReducer,
        auth: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
