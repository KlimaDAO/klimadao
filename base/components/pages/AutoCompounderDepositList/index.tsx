import { Box } from "@mui/material";
import { Layout } from "components/AppLayout";
import { DepositList } from "components/DepositList";
import TabsHeader from "components/TabsHeader";
import { NextPage } from "next";

// The page component remains largely the same
const AutoCompounderDepositList: NextPage = () => {
  return (
    <Layout>
      <TabsHeader />
      <Box py={4}>
        <DepositList />
      </Box>
    </Layout>
  );
};

export default AutoCompounderDepositList;
