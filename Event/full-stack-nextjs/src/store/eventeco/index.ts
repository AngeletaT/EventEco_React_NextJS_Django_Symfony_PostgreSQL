import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store_e = configureStore({
    reducer: {
        // category: categorySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store_e.getState>;
export type AppDispatch = typeof store_e.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store_e;
