import { useQuery } from "@tanstack/react-query";
import { TOKEN_PLATFORM_MAP } from "lib/constants";
import { Address, getContract } from "viem";
import { usePublicClient } from "wagmi";
import { useTokenPrices } from "./useTokenPrice";

const LP_ABI = [
  {
    name: "getReserves",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { type: "uint112", name: "_reserve0" },
      { type: "uint112", name: "_reserve1" },
      { type: "uint32", name: "_blockTimestampLast" },
    ],
  },
  {
    name: "totalSupply",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    name: "token0",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
  {
    name: "token1",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
] as const;

const ERC20_ABI = [
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string", name: "" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
] as const;

interface TokenInfo {
  address: Address;
  symbol: string;
  decimals: number;
  platform: string;
}

interface LPTokenInfo {
  token0: TokenInfo;
  token1: TokenInfo;
}

interface LPPriceInfo {
  totalLiquidity: number;
  pricePerLPToken: number;
  reserves: {
    token0: bigint;
    token1: bigint;
  };
  token0ValueUSD: number;
  token1ValueUSD: number;
  token0: TokenInfo & { priceUSD: number };
  token1: TokenInfo & { priceUSD: number };
}

interface UseLPPriceOptions {
  lpAddress: Address;
  refreshInterval?: number;
  enabled?: boolean;
}

export const useLPPrice = ({
  lpAddress,
  refreshInterval = 60000,
  enabled = true,
}: UseLPPriceOptions) => {
  const publicClient = usePublicClient();

  const {
    data: tokenInfo,
    isLoading: isTokenInfoLoading,
    error: tokenInfoError,
  } = useQuery<LPTokenInfo>({
    queryKey: ["lp-token-info", lpAddress, publicClient.chain.id],
    queryFn: async () => {
      const lpContract = getContract({
        address: lpAddress,
        abi: LP_ABI,
        publicClient,
      });

      const [token0Address, token1Address] = await Promise.all([
        lpContract.read.token0(),
        lpContract.read.token1(),
      ]);

      const [token0Contract, token1Contract] = [
        token0Address,
        token1Address,
      ].map((address) =>
        getContract({
          address,
          abi: ERC20_ABI,
          publicClient,
        })
      );

      const [[token0Symbol, token0Decimals], [token1Symbol, token1Decimals]] =
        await Promise.all([
          Promise.all([
            token0Contract.read.symbol(),
            token0Contract.read.decimals(),
          ]),
          Promise.all([
            token1Contract.read.symbol(),
            token1Contract.read.decimals(),
          ]),
        ]);

      const token0Platform = TOKEN_PLATFORM_MAP[token0Symbol];
      const token1Platform = TOKEN_PLATFORM_MAP[token1Symbol];

      if (!token0Platform) {
        console.error(`Unknown platform for token: ${token0Symbol}`);
      }
      if (!token1Platform) {
        console.error(`Unknown platform for token: ${token1Symbol}`);
      }

      return {
        token0: {
          address: token0Address,
          symbol: token0Symbol,
          decimals: token0Decimals,
          platform: token0Platform || "Unknown",
        },
        token1: {
          address: token1Address,
          symbol: token1Symbol,
          decimals: token1Decimals,
          platform: token1Platform || "Unknown",
        },
      };
    },
    enabled,
  });

  const {
    tokenData: tokenPrices,
    isLoading: isTokenPricesLoading,
    error: tokenPricesError,
  } = useTokenPrices({
    tokens: tokenInfo
      ? [
          {
            symbol: tokenInfo.token0.symbol,
            platformName: tokenInfo.token0.platform,
          },
          {
            symbol: tokenInfo.token1.symbol,
            platformName: tokenInfo.token1.platform,
          },
        ]
      : [],
    refreshInterval,
    enabled: Boolean(tokenInfo && enabled),
  });

  const {
    data: lpData,
    isLoading: isLPDataLoading,
    error: lpDataError,
  } = useQuery<LPPriceInfo>({
    queryKey: [
      "lp-price",
      lpAddress,
      tokenInfo,
      tokenPrices,
      publicClient.chain.id,
    ],
    queryFn: async () => {
      if (!tokenInfo || !tokenPrices?.length) {
        throw new Error("Required token data not available");
      }

      const [reserves, totalSupply] = await Promise.all([
        publicClient.readContract({
          address: lpAddress,
          abi: LP_ABI,
          functionName: "getReserves",
        }),
        publicClient.readContract({
          address: lpAddress,
          abi: LP_ABI,
          functionName: "totalSupply",
        }),
      ]);

      const [reserve0, reserve1] = reserves;
      const token0Price = tokenPrices[0]?.quote.USD.price ?? 0;
      const token1Price = tokenPrices[1]?.quote.USD.price ?? 0;

      const token0ValueUSD =
        (Number(reserve0) * token0Price) / 10 ** tokenInfo.token0.decimals;
      const token1ValueUSD =
        (Number(reserve1) * token1Price) / 10 ** tokenInfo.token1.decimals;

      const totalLiquidity = token0ValueUSD + token1ValueUSD;
      const pricePerLPToken = (totalLiquidity / Number(totalSupply)) * 10 ** 18;

      return {
        totalLiquidity,
        pricePerLPToken,
        reserves: {
          token0: reserve0,
          token1: reserve1,
        },
        token0ValueUSD,
        token1ValueUSD,
        token0: {
          ...tokenInfo.token0,
          priceUSD: token0Price,
        },
        token1: {
          ...tokenInfo.token1,
          priceUSD: token1Price,
        },
      };
    },
    enabled: Boolean(
      enabled && tokenInfo && tokenPrices?.length === 2 && !isTokenPricesLoading
    ),
    refetchInterval: enabled ? refreshInterval : false,
  });

  return {
    data: lpData,
    isLoading: isTokenInfoLoading || isTokenPricesLoading || isLPDataLoading,
    error: lpDataError || tokenPricesError || tokenInfoError,
  };
};
