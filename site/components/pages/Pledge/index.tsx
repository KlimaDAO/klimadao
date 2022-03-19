import { NextPage } from "next";
import { Navigation } from "components/Navigation";

import { Auth } from "./Auth";

export const Pledge: NextPage = () => {
  return (
    <>
      <Navigation activePage="Home" />
      <Auth />
    </>
  );
};
