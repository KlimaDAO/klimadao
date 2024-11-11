import { Box, Container } from "@mui/material";
import { NextPage } from "next";

import { Layout } from "components/AppLayout";
import { AutoCompounderStakeForm } from "components/AutoCompounder/Forms/StakeForm";
import TabsHeader from "components/TabsHeader";

const AutoCompounderStakeToken: NextPage = () => {
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
          <AutoCompounderStakeForm />
        </Container>
      </Box>
    </Layout>
  );
};

export default AutoCompounderStakeToken;
