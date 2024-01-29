import { GQL_SDK } from "../gqlSdk";

export const getTokenById = async (
  sdk: GQL_SDK,
  id: string
): Promise<{ symbol: string }> => {
  const query = await sdk.digital_carbon.getTokenById({ id });

  if (!query.token) {
    throw new Error(`Token with id '${id}' not found`);
  }

  return {
    symbol: query.token.symbol,
  };
};

export const getTokenIdByProject = async (
  sdk: GQL_SDK,
  key: string,
  vintage: number
): Promise<{ tokenId: string }> => {
  const query = (
    await sdk.digital_carbon.getProjectTokenId({
      projectID: key,
      vintage,
    })
  ).carbonCredits;

  if (!query[0] || !query[0].tokenId) {
    throw new Error(`Couldn't find tokenId for project ${key}-${vintage}`);
  }

  return {
    tokenId: query[0].tokenId,
  };
};
