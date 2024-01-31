import nock from "nock";
import { Listing } from "src/.generated/types/marketplace.types";
import { GRAPH_URLS } from "../../../../src/app.constants";

export const mockGraphResponses = (props: {
  listing?: Listing;
  symbol?: { symbol: string };
}) => {
  nock(GRAPH_URLS["polygon"].marketplace)
    .post("")
    .reply(200, {
      data: { listing: props.listing },
    });
  nock(GRAPH_URLS["polygon"].digitalCarbon)
    .post("")
    .reply(200, {
      data: { token: props.symbol },
    });
};
