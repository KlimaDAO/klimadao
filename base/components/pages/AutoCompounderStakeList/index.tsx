import { Box, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { StakeList } from "components/StakeList";
import TabsHeader from "components/TabsHeader";
import { NextPage } from "next";

// The page component remains largely the same
const AutoCompounderStakeList: NextPage = () => {
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
        <StakeList />
      </Box>
    </Layout>
  );
};

export default AutoCompounderStakeList;
