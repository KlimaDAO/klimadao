import { Box, useTheme } from "@mui/material";
import { Layout } from "components/AppLayout";
import { StakeList } from "components/AutoCompounder/StakeList";
import { TabsHeader } from "components/AutoCompounder/TabsHeader";
import { NextPage } from "next";

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
