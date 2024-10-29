import { Box, ThemeProvider } from "@mui/material";
import { Layout } from "components/AppLayout";
import { DepositList } from "components/DepositList";
import TabsHeader from "components/TabsHeader";
import { AppTheme } from "lib/theme";
import { NextPage } from "next";

// The page component remains largely the same
const AutoCompounderDepositList: NextPage = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Layout>
        <TabsHeader />
        <Box py={4}>
          <DepositList />
        </Box>
      </Layout>
    </ThemeProvider>
  );
};

export default AutoCompounderDepositList;
