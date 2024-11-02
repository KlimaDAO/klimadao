import { Box, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { AutoCompounderPositionsTable } from "components/AutoCompounderPositionsTable";
import TabsHeader from "components/TabsHeader";
import { NextPage } from "next";

const positions = [
  {
    token0: "WETH",
    token1: "KLIMA",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    token0: "USDC",
    token1: "KLIMA",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    token0: "BCT",
    token1: "USDC",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    token0: "WETH",
    token1: "KLIMA",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    token0: "WETH",
    token1: "KLIMA",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    token0: "WETH",
    token1: "KLIMA",
    poolValue: 12500236.7,
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
];

const AutoCompounderPositions: NextPage = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Box>
        <TabsHeader />
        <Box
          sx={{
            mt: "20px",
            p: "20px",
            bgcolor: theme.palette.background.default,
            borderRadius: "8px",
          }}
        >
          <AutoCompounderPositionsTable
            positions={positions}
            onWithdraw={console.log}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default AutoCompounderPositions;
