import { Box, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import {
  AutoCompounderPositionsTable,
  Position,
} from "components/AutoCompounderPositionsTable";
import TabsHeader from "components/TabsHeader";
import { LIQUIDITY_POOLS } from "lib/constants";
import { NextPage } from "next";

const positions: Position[] = [
  {
    lpToken: LIQUIDITY_POOLS["weth-klima"],
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
  {
    lpToken: LIQUIDITY_POOLS["usdc-klima"],
    balance: { usd: 500.0, lpTokens: 1.2 },
    yield: { usd: 147.85, lpTokens: 0.56 },
    tvl: { usd: 105176.0, vaultTokens: 4 },
  },
];

const AutoCompounderPositions: NextPage = () => {
  const theme = useTheme();
  return (
    <Layout>
      <TabsHeader />
      <Box
        sx={{
          mt: "20px",
          p: "20px",
          bgcolor: theme.palette.background.default,
          borderRadius: "8px",
        }}
      >
        <AutoCompounderPositionsTable positions={positions} />
      </Box>
    </Layout>
  );
};

export default AutoCompounderPositions;
