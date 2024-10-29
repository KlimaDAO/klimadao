import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Connect } from "components/Connect";
import { useRouter } from "next/router";

const TabsHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  // Helper to determine current tab value based on route
  const getCurrentTabValue = () => {
    const path = router.pathname;
    if (path.includes("/auto-compounder/deposit")) return 0;
    if (path.includes("/auto-compounder/positions")) return 1;
    return 1; // Default to positions
  };

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push("/auto-compounder/deposit/all");
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
              px: 1,
              mr: 2,
              "&.Mui-selected": {
                color: "text.primary",
              },
            },
          }}
        >
          <Tab label="Deposit" />
          <Tab label="Your Positions" />
        </Tabs>

        {/* Desktop Wallet Button */}
        {!isMobile && <Connect />}
      </Stack>

      {/* Mobile Wallet Button */}
      {isMobile && (
        <Box sx={{ px: 3, py: 2 }}>
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <Button
                  fullWidth
                  onClick={!connected ? openConnectModal : undefined}
                  variant="contained"
                  sx={{
                    bgcolor: "rgba(0, 204, 51, 0.1)",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "rgba(0, 204, 51, 0.2)",
                    },
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                  }}
                >
                  {!connected ? "Connect Wallet" : account.displayName}
                </Button>
              );
            }}
          </ConnectButton.Custom>
        </Box>
      )}
    </Box>
  );
};

export default TabsHeader;
