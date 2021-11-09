import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "state";

export const WithRedux: FC = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};
