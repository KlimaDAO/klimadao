import { Box, CircularProgress, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { PositionsTable } from "components/AutoCompounder/PositionsTable";
import TabsHeader from "components/AutoCompounder/TabsHeader";
import { useVaultsPositions } from "hooks/useVaultsPositions";
import { NextPage } from "next";

const AutoCompounderPositions: NextPage = () => {
  const {
    data: positions,
    isLoading: isPositionDataLoading,
    refetch,
  } = useVaultsPositions();

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
        <PositionsTable positions={positions} refetchPositions={refetch} />
      </Box>
    </Layout>
  );
};

export default AutoCompounderPositions;
