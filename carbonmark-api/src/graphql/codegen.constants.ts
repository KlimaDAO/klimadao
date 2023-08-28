export const GRAPH_API_ROOT = "https://api.thegraph.com/subgraphs/name";

//@todo replace these with env vars from vercel
export const GRAPH_URLS = {
  marketplace: `${GRAPH_API_ROOT}/najada/marketplace-matic`,
  tokens: `${GRAPH_API_ROOT}/klimadao/klimadao-pairs`,
  assets: `${GRAPH_API_ROOT}/cujowolf/klima-refi-current-holdings`,
  offsets: `${GRAPH_API_ROOT}/klimadao/polygon-bridged-carbon`,
};
export const SANITY_URLS = {
  carbonProjects:
    "https://l6of5nwi.apicdn.sanity.io/v1/graphql/production/default",
};
