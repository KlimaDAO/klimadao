import { FC, ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

/**
 * NOTE: server doesn't receive hash urls
 */
interface Props {
  /** A path provided to static router for server-side pre-rendering */
  location: string;
  children: ReactNode;
}
export const WithIsomorphicRouter: FC<Props> = (props) => {
  if (typeof document !== "undefined") {
    return <HashRouter>{props.children}</HashRouter>;
  }
  return (
    <StaticRouter location={props.location}>{props.children}</StaticRouter>
  );
};
