// https://stackoverflow.com/questions/53139884/next-js-disable-server-side-rendering-on-some-pages
import { ReactNode, useLayoutEffect, useState } from "react";
import React from "react";

const DefaultOnSSR: React.FC = () => null;
export const NoSSR: React.FC<{ children: ReactNode; onSSR?: ReactNode }> = ({
  children,
  onSSR = <DefaultOnSSR />,
}) => {
  const [onBrowser, setOnBrowser] = useState(false);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") setOnBrowser(true);
  }, []);
  return <>{onBrowser ? children : onSSR} </>;
};
