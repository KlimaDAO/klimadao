import { Box, Container } from "@mui/material";
import { Layout } from "components/AppLayout";
import { StakeForm } from "components/AutoCompounder/Forms/StakeForm";
import TabsHeader from "components/AutoCompounder/TabsHeader";
import { NextPage } from "next";

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
          <StakeForm />
        </Container>
      </Box>
    </Layout>
  );
};

export default AutoCompounderStakeToken;
