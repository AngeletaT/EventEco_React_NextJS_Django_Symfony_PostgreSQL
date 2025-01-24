import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../../store/eventeco/index";

// Hook personalizado para usar dispatch tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook personalizado para usar el selector tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
