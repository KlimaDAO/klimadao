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
