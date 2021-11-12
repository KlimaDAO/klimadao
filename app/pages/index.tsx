import { Home } from "components/views/Home";
import { WithIsomorphicRouter } from "components/WithIsomorphicRouter";
import { WithRedux } from "components/WithRedux";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <WithRedux>
      <WithIsomorphicRouter location="/#">
        <Home />
      </WithIsomorphicRouter>
    </WithRedux>
  );
};

export default HomePage;
