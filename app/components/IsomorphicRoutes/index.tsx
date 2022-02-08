import { Loading } from "components/views/Loading";
import React, { ReactElement, useEffect, useState } from "react";
import { RoutesProps, Routes, Route, RouteProps } from "react-router-dom";

interface Props extends RoutesProps {
  children: (ReactElement<RouteProps> | ReactElement<RouteProps>[])[];
}

// Because we use HashRouter on the browser and StaticRouter on the server,
// The server can't know what route is trying to be rendered
// It always renders the index route on the server
// By the time next.js tries to hydrate the view, react-router is rendering a view
export const IsomorphicRoutes = (props: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // Map over every route and inject a Loading view instead of the default view.
  // When the browser has finished the mount lifecycle, render the original views.
  const isomorphicChildren = React.Children.map(props.children, (el) => {
    if (Array.isArray(el)) {
      // just to make typescript happy
      return el.map((nestedEl) => {
        React.cloneElement(nestedEl, { element: <Loading /> });
      });
    } else {
      return React.cloneElement(el, { element: <Loading /> });
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      {loading ? isomorphicChildren : props.children}
    </Routes>
  );
};
