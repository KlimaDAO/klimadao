import { Box, Container } from "@mui/material";
import { NextPage } from "next";

import { Layout } from "components/AppLayout";
import { AutoCompounderForm } from "components/AutoCompounderForm";
import TabsHeader from "components/TabsHeader";

const AutoCompounderDepositToken: NextPage = () => {
  return (
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
  );
};

export default AutoCompounderDepositToken;
