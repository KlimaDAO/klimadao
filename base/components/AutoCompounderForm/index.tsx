import {
  Autorenew,
  Favorite,
  HelpOutline,
  KeyboardArrowDown,
  Launch,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import {
  MaxButton,
  StyledInputWrapper,
  StyledPaper,
  StyledSelect,
} from "./styles";

// Interfaces
interface Token {
  id: string;
  name: string;
  balance?: string;
}

interface AddressDisplayProps {
  label: string;
  address: string;
}

interface StatDisplayProps {
  label: string;
  value: string;
}

// Token mapping
const TOKENS: { [key: string]: Token } = {
  "weth-klima": {
    id: "weth-klima",
    name: "WETH/KLIMA",
  },
  "usdc-klima": {
    id: "usdc-klima",
    name: "USDC/KLIMA",
  },
  "btc-usdc": {
    id: "btc-usdc",
    name: "BTC/USDC",
  },
  "klima-cbbtc": {
    id: "klima-cbbtc",
    name: "KLIMA/cbBTC",
  },
  "klima-aero": {
    id: "klima-aero",
    name: "KLIMA/AERO",
  },
};

const TOOLTIPS = {
  addLiquidity: "Add liquidity to the pool to get LP tokens",
  apy: "Annual Percentage Yield (APY) includes compound interest, showing total returns over one year",
  apr: "Annual Percentage Rate (APR) shows the simple interest rate without compounding",
  vault: "Smart contract that holds your LP tokens",
  strategy: "Smart contract that automates the compounding strategy",
};

// Components
const AddressDisplay: React.FC<AddressDisplayProps> = ({ label, address }) => (
  <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>

    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Typography variant="body2" color="primary">
        {address}
      </Typography>
      <IconButton size="small">
        <Launch fontSize="small" />
      </IconButton>
    </Stack>
  </Stack>
);

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => (
  <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Stack direction="row" alignItems={"center"} spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
      <Tooltip
        arrow
        placement="top"
        title={TOOLTIPS[label.toLowerCase() as keyof typeof TOOLTIPS]}
        sx={{
          bgcolor: "background.paper",
          "& .MuiTooltip-arrow": {
            color: "background.paper",
          },
        }}
      >
        <IconButton size="small">
          <HelpOutline fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  </Stack>
);
export const AutoCompounderForm: React.FC = () => {
  const router = useRouter();
  const { tokens } = router.query;

  const defaultToken = React.useMemo(() => {
    if (!tokens || typeof tokens !== "string") return TOKENS["weth-klima"];
    return TOKENS[tokens] || TOKENS["weth-klima"];
  }, [tokens]);

  const [pool, setPool] = React.useState<string>(defaultToken.name);
  const [amount, setAmount] = React.useState<string>("");

  const handlePoolChange = (event: SelectChangeEvent<string>) => {
    const newPool = event.target.value;
    setPool(newPool);
    const tokenId = Object.entries(TOKENS).find(
      ([, token]) => token.name === newPool
    )?.[0];
    if (tokenId) {
      router.push(`/auto-compounder/deposit/${tokenId}`);
    }
  };

  const handleMaxClick = () => {
    // Implement max amount logic here
    setAmount("100");
  };

  const handleDeposit = async () => {
    // Implement deposit logic here
    console.log("Depositing:", { pool, amount });
  };

  return (
    <StyledPaper elevation={0}>
      {/* Header */}
      <Stack spacing={1} width="100%">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Autorenew />
          <Typography variant="h5" fontWeight={700}>
            Auto Compounder
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Deposit LP tokens and auto-compound your rewards. You can withdraw
          your LP tokens at any time.
        </Typography>
      </Stack>

      {/* Pool Selection */}
      <Stack spacing={1} width="100%">
        <Typography variant="body1">Pool</Typography>
        <StyledSelect
          value={pool}
          onChange={handlePoolChange}
          IconComponent={KeyboardArrowDown}
          fullWidth
        >
          {Object.values(TOKENS).map((token) => (
            <MenuItem key={token.id} value={token.name}>
              {token.name}
            </MenuItem>
          ))}
        </StyledSelect>
        <Typography variant="body2" color="text.secondary">
          Balance: {defaultToken.balance}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip
              arrow
              placement="top"
              title={TOOLTIPS.addLiquidity}
              sx={{
                bgcolor: "background.paper",
                "& .MuiTooltip-arrow": {
                  color: "background.paper",
                },
              }}
            >
              <>
                <Typography variant="body2" color="primary">
                  Add Liquidity
                </Typography>
                <Launch fontSize="small" />
              </>
            </Tooltip>
          </Stack>
          <IconButton size="small">
            <HelpOutline fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Deposit Amount */}
      <Stack width="100%">
        <Typography variant="body1">Amount to Deposit</Typography>
        <StyledInputWrapper>
          <InputBase
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ pl: 1.5, width: "calc(100% - 70px)" }}
          />
          <MaxButton variant="text" onClick={handleMaxClick}>
            MAX
          </MaxButton>
        </StyledInputWrapper>

        <Stack py={"4px"}>
          <AddressDisplay label="Vault:" address="0x123...ABC" />
          <AddressDisplay label="Strategy:" address="0x123...ABC" />
        </Stack>
      </Stack>

      {/* Stats */}
      <Stack spacing={1} width="100%">
        <StatDisplay label="APY" value="123%" />
        <StatDisplay label="APR" value="123%" />
      </Stack>

      {/* Info Box */}
      <Paper
        sx={{
          p: 1.5,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Favorite />
            <Typography variant="body1">You're making a difference.</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ pl: 3.5 }}>
            We automatically redirect 1% of your LP yield to burn KLIMA and
            retire the underlying carbon credits.
          </Typography>
        </Stack>
      </Paper>

      {/* Deposit Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleDeposit}
        sx={{
          height: "48px",
          bgcolor: "text.secondary",
          color: "background.paper",
          "&:hover": {
            bgcolor: "text.secondary",
          },
        }}
      >
        DEPOSIT
      </Button>
    </StyledPaper>
  );
};
