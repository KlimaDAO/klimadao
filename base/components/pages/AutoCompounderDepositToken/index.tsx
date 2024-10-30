import { Box, Container, ThemeProvider } from "@mui/material";
import { AppTheme } from "lib/theme";
import { NextPage } from "next";

import { Layout } from "components/AppLayout";
import { AutoCompounderForm } from "components/AutoCompounderForm";
import TabsHeader from "components/TabsHeader";

const AutoCompounderDepositToken: NextPage = () => {
  return (
    <div>
      <ThemeProvider theme={AppTheme}>
        <Layout>
          <Box>
            <TabsHeader />
            <Container
              maxWidth="sm"
              sx={{
                py: "32px",
                px: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoCompounderForm />
            </Container>
          </Box>
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default AutoCompounderDepositToken;
