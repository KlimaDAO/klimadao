import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { DisclaimerModal } from "components/DisclaimerModal";
import { FC, ReactNode, useState } from "react";
import { MobileHeader } from "../MobileHeader";
import { Sidebar } from "../Sidebar";

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<Readonly<LayoutProps>> = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DisclaimerModal />
      <CssBaseline />
      {isMobile && <MobileHeader onMenuClick={handleDrawerToggle} />}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          pt: { xs: 8, sm: 5 }, // Adjusted padding top for mobile header
          px: { xs: 2, sm: 6 },
          pb: 8,
          background: theme.palette.background.paper,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
