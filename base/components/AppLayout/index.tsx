import {
  AppBar,
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MobileHeader } from "../MobileHeader";
import { Sidebar } from "../SidePanel";

import { ReactNode, useState } from "react";

const DRAWER_WIDTH = 280;

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar - Shown only on mobile */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
          }}
        >
          <MobileHeader onMenuClick={handleDrawerToggle} />
        </AppBar>
      )}

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          pt: { xs: 8, sm: 5 }, // Adjusted padding top for mobile header
          px: { xs: 3, sm: 6 },
          pb: 3,
          background: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
