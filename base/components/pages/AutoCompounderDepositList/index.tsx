import { Box, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { DepositList } from "components/DepositList";
import TabsHeader from "components/TabsHeader";
import { NextPage } from "next";

// The page component remains largely the same
const AutoCompounderDepositList: NextPage = () => {
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
        <DepositList />
      </Box>
    </Layout>
  );
};

export default AutoCompounderDepositList;
