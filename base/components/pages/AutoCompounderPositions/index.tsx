import { Box, CircularProgress, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { AutoCompounderPositionsTable } from "components/AutoCompounderPositionsTable";
import TabsHeader from "components/TabsHeader";
import { useVaultsPositions } from "hooks/useVaultsPositions";

import { NextPage } from "next";

const AutoCompounderPositions: NextPage = () => {
  const { data: positions, isLoading: isPositionDataLoading } =
    useVaultsPositions();

  const theme = useTheme();

  if (isPositionDataLoading) {
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
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <Layout>
        {" "}
        <TabsHeader />
        <Box
          sx={{
            mt: "20px",
            p: "20px",
            bgcolor: theme.palette.background.default,
            borderRadius: "8px",
          }}
        >
          No positions found
        </Box>
      </Layout>
    );
  }

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
