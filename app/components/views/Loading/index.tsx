import React, { FC } from "react";
import { Trans } from "@lingui/macro";

/**
 * Due to problems with react-router (needed for IPFS) and next.js isomorphic rendering,
 * return this placeholder view until the app mounts and the correct view can be resolved.
 */
export const Loading: FC = () => {
  return (
    <div>
      <Trans id="home.loading">Loading...</Trans>
    </div>
  );
};
