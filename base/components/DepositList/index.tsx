import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TokenPairLogo } from "components/Logos/TokenPairLogos";
import { useRouter } from "next/router";

export interface TokenPair {
  token1: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  token2: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  apy: number;
  daily: number;
  tvl: number;
}

const MOCK_DATA: TokenPair[] = [
  {
    token1: "WETH",
    token2: "KLIMA",
    apy: 23.17,
    daily: 0.0571,
    tvl: 105176,
  },
  {
    token1: "USDC",
    token2: "KLIMA",
    apy: 23.17,
    daily: 0.0571,
    tvl: 105176,
  },
  // Add other pairs as needed
];

export const DepositList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const handleDeposit = (token1: string, token2: string) => {
    // Convert tokens to lowercase for URL
    const formattedPath = `/auto-compounder/deposit/${token1.toLowerCase()}-${token2.toLowerCase()}`;
    router.push(formattedPath);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
      }}
    >
      {/* Header - Hidden on mobile */}
      {!isMobile && (
        <Grid
          container
          py={1}
          px={2}
          sx={{
            backgroundColor: theme.palette.background.paper,
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Grid item sm={4}>
            <Typography variant="body2" color="text.secondary">
              POOL
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body2" color="text.secondary">
              DAILY
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body2" color="text.secondary">
              TVL
            </Typography>
          </Grid>
          <Grid item sm={2} />
        </Grid>
      )}

      {/* List Items */}
      {MOCK_DATA.map((pair, index) => (
        <Box
          key={`${pair.token1}-${pair.token2}`}
          sx={{
            py: 1,
            px: 2,
            borderTop: index === 0 ? 1 : 0,
            borderBottom: 1,
            borderColor: "#9C9C9C",
          }}
        >
          {/* Desktop View */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Grid item sm={4} sx={{ display: "flex", alignItems: "center" }}>
              <TokenPairLogo token1={pair.token1} token2={pair.token2} />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {pair.token1}/{pair.token2}
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="body1">{pair.apy}%</Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="body1">{pair.daily}%</Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="body1">
                ${pair.tvl.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Button
                // variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  color: "primary.main",
                  borderColor: "primary.main",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(0, 204, 51, 0.1)",
                  },
                }}
                onClick={() => handleDeposit(pair.token1, pair.token2)}
              >
                Deposit +
              </Button>
            </Grid>
          </Grid>

          {/* Mobile View */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TokenPairLogo token1={pair.token1} token2={pair.token2} />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {pair.token1}/{pair.token2}
              </Typography>
            </Box>

            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  APY
                </Typography>
                <Typography variant="body1">{pair.apy}%</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  DAILY
                </Typography>
                <Typography variant="body1">{pair.daily}%</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  TVL
                </Typography>
                <Typography variant="body1">
                  ${pair.tvl.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>

            <Button
              color="primary"
              fullWidth
              sx={{
                borderRadius: 1,
                textTransform: "none",
                color: "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(0, 204, 51, 0.1)",
                },
              }}
            >
              Deposit +
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
