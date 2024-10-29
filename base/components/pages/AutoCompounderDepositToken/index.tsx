import { Box, ThemeProvider } from "@mui/material";
import { AppTheme } from "lib/theme";
import { NextPage } from "next";

import { Layout } from "components/AppLayout";
import TabsHeader from "components/TabsHeader";
import { useRouter } from "next/router";

const AutoCompounderDepositToken: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <div>
      <ThemeProvider theme={AppTheme}>
        <Layout>
          <Box>
            <TabsHeader />
            <h1>Deposit {token}</h1>
          </Box>
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default AutoCompounderDepositToken;
