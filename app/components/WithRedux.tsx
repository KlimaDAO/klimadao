import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "state";

interface Props {
  children: ReactNode;
}

export const WithRedux = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};
