import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";

interface TokenQuote {
  price: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
}

interface TokenPlatform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

interface TokenInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  platform?: TokenPlatform;
  quote: {
    USD: TokenQuote;
  };
}

interface ApiResponse {
  data: {
    [symbol: string]: TokenInfo[];
  };
  status: {
    error_code: number;
    error_message: string | null;
    credit_count: number;
  };
}

interface TokenFilter {
  symbol: string;
  platformName?: string;
  tokenAddress?: string;
}

interface UseTokenPricesOptions {
  tokens: TokenFilter[];
  refreshInterval?: number;
  enabled?: boolean;
}

export const useTokenPrices = ({
  tokens,
  refreshInterval = 60000,
  enabled = true,
}: UseTokenPricesOptions) => {
  const publicClient = usePublicClient();

  const filterTokens = (apiData: ApiResponse["data"]): TokenInfo[] => {
    const filteredTokens: TokenInfo[] = [];

    tokens.forEach((filterParams) => {
      const symbolData = apiData[filterParams.symbol.toUpperCase()];

      if (!symbolData) return;

      const matchingTokens = symbolData.filter((token) => {
        if (!filterParams.platformName) {
          return true;
        }

        const platformMatch = token.platform?.name
          ? token.platform.name.toLowerCase() ===
            filterParams.platformName.toLowerCase()
          : publicClient.chain.name.toLowerCase() ===
            filterParams.platformName.toLowerCase();

        if (filterParams.tokenAddress && platformMatch) {
          return (
            token.platform?.token_address.toLowerCase() ===
            filterParams.tokenAddress.toLowerCase()
          );
        }

        return platformMatch;
      });

      filteredTokens.push(...matchingTokens);
    });

    return filteredTokens;
  };

  const fetchPrices = async (): Promise<TokenInfo[]> => {
    const symbols = tokens.map((t) => t.symbol.toUpperCase()).join(",");
    const response = await fetch(`/api/prices?symbols=${symbols}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (result.status.error_code) {
      throw new Error(result.status.error_message || "Unknown API error");
    }

    return filterTokens(result.data);
  };

  const queryKey = [
    "tokenPrices",
    publicClient.chain.id,
    JSON.stringify(tokens),
  ];

  const {
    data: tokenData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: fetchPrices,
    refetchInterval: enabled ? refreshInterval : false,
    enabled: enabled && tokens.length > 0,
    staleTime: refreshInterval / 2, // Consider data stale after half the refresh interval
    retry: 2, // Retry failed requests twice
  });

  return {
    tokenData,
    isLoading,
    isError,
    error: error instanceof Error ? error : new Error("Unknown error occurred"),
    refresh: refetch,
  };
};
