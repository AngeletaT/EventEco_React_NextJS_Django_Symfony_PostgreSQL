import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const EventecoProvider = configureStore({
    reducer: {
        // category: categorySlice.reducer,
    },
});

export type RootState = ReturnType<typeof EventecoProvider.getState>;
export type AppDispatch = typeof EventecoProvider.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default EventecoProvider;
