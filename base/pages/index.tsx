import { ThemeProvider } from "@mui/material";
import { Layout } from "components/AppLayout";

import { Home } from "components/pages/Home";
import { AppTheme } from "lib/theme";
import { NextPage } from "next";

const HomePage: NextPage = () => (
  <ThemeProvider theme={AppTheme}>
    <Layout>
      <Home />
    </Layout>
  </ThemeProvider>
);

export default HomePage;
