import { Box, ThemeProvider } from "@mui/material";
import { Layout } from "components/AppLayout";
import TabsHeader from "components/TabsHeader";
import { AppTheme } from "lib/theme";
import { NextPage } from "next";

const AutoCompounderPositions: NextPage = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Layout>
        <Box>
          <TabsHeader />
          <h1>Positions Page</h1>
        </Box>
      </Layout>
    </ThemeProvider>
  );
};

export default AutoCompounderPositions;
