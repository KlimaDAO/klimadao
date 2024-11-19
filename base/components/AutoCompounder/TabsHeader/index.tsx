import { Box, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Connect } from "components/Connect";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NavLinks } from "../NavLinks";

const TabsHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Helper to determine current tab value based on route
  const getCurrentTabValue = () => {
    const path = router.pathname;
    if (path.includes("/auto-compounder/stake")) return 0;
    if (path.includes("/auto-compounder/positions")) return 1;
    return 1; // Default to positions
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      router.push("/auto-compounder/stake/all");
    } else {
      router.push("/auto-compounder/positions");
    }
  };

  return (
    <Box sx={{ width: "100%", marginTop: "2.4rem" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderBottom: 1,
          borderColor: "background.paper",
        }}
      >
        <Tabs
          value={getCurrentTabValue()}
          onChange={handleChange}
          TabIndicatorProps={{
            sx: {
              bgcolor: "primary.main",
              height: 2,
            },
          }}
          sx={{
            minHeight: "4rem",
            "& .MuiTab-root": {
              color: "text.secondary",
              fontSize: "1.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "Poppins",
              px: 0,
              mr: 1,
              "&.Mui-selected": {
                color: "text.primary",
              },
            },
            "& .MuiTabs-fixed": {
              height: "4.4rem",
            },
          }}
        >
          <Tab sx={{ minWidth: "6.9rem" }} label="Stake" />
          <Tab label="Your Positions" />
        </Tabs>
        {!isMobile && (
          <Box display="flex" gap="4rem" alignItems="center">
            <NavLinks />
            <Connect />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(TabsHeader), { ssr: false });
