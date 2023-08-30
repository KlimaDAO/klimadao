import nock from "nock";

export type GQLMockDefinition = [url: string, query: string, response: any];

export const mockGqlRequest = ([url, query, response]: GQLMockDefinition) => {
  nock(url)
    .post("", (body) => body.query.includes(query))
    .reply(200, { data: response });
};
