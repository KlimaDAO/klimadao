import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
