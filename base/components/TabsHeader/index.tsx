import { Box, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Connect } from "components/Connect";
import { useRouter } from "next/router";

const TabsHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

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
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderBottom: 1,
          borderColor: "background.paper",
        }}
      >
        {/* MUI Tabs */}
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
            "& .MuiTab-root": {
              color: "text.secondary",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              fontFamily: "Poppins",
              px: 1,
              mr: 2,
              "&.Mui-selected": {
                color: "text.primary",
              },
            },
          }}
        >
          <Tab label="Stake" />
          <Tab label="Your Positions" />
        </Tabs>

        {!isMobile && <Connect />}
      </Stack>
    </Box>
  );
};

export default TabsHeader;
