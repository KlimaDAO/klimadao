import { WithRedux } from "components/WithRedux";
import { NextPage } from "next";
import { Provider } from "react-redux";

export interface Props {
  test?: string;
}

export const Home: NextPage<Props> = (props) => {
  return (
    <WithRedux>
      <div>test test</div>
    </WithRedux>
  );
};
