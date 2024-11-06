import { Box, Container } from "@mui/material";
import { NextPage } from "next";

import { Layout } from "components/AppLayout";
import { AutoCompounderDepositForm } from "components/AutoCompounder/Forms/DepositForm";
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
          <AutoCompounderDepositForm />
        </Container>
      </Box>
    </Layout>
  );
};

export default AutoCompounderDepositToken;
