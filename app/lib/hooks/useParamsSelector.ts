import { useSelector } from "react-redux";

export const useParamSelector = (
  selector: any,
  ...params: Record<string, any>[]
) => {
  return useSelector((state) => selector(state, ...params));
};
