import {
  Autorenew,
  Favorite,
  HelpOutline,
  KeyboardArrowDown,
  Launch,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Address, useAccount, useBalance } from "wagmi";
import DepositConfirmationModal from "./DepositModal";
import {
  CustomInputBase,
  MaxButton,
  StyledInputWrapper,
  StyledPaper,
  StyledSelect,
} from "./styles";

export interface Token {
  id: string;
  name: string;
  address: Address;
  decimals: number;
}

export interface LiquidityPool {
  id: string;
  name: string;
  balance?: string;
  address: Address;
  vault?: Address;
  decimals: number;
  tokenA: Token;
  tokenB: Token;
}

// Interfaces

interface AddressDisplayProps {
  label: string;
  address: string;
}

interface StatDisplayProps {
  label: string;
  value: string;
}

const TOKENS: { [key: string]: Token } = {
  weth: {
    id: "weth",
    name: "WETH",
    address: "0x4200000000000000000000000000000000000006", // Add actual address
    decimals: 18,
  },
  usdc: {
    id: "usdc",
    name: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Add actual address
    decimals: 6,
  },
  klima: {
    id: "klima",
    name: "KLIMA",
    address: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2", // Add actual address
    decimals: 18,
  },
};

// Token mapping
const LIQUIDITY_POOLS: { [key: string]: LiquidityPool } = {
  "weth-klima": {
    id: "weth-klima",
    name: "WETH/KLIMA",
    address: "0xB37642E87613d8569Fd8Ec80888eA6c63684E79e", // Add actual address
    vault: "0x456...", // Add actual vault address
    decimals: 18,
    tokenA: TOKENS["weth"],
    tokenB: TOKENS["klima"],
  },
  "usdc-klima": {
    id: "usdc-klima",
    name: "USDC/KLIMA",
    address: "0x958682eC6282BC7E939FA8Ba9397805C214c3A09", // Add actual address
    vault: "0xabc...", // Add actual vault address
    decimals: 18,
    tokenA: TOKENS["usdc"],
    tokenB: TOKENS["klima"],
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
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>

    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Link href={"https://aerodrome.finance/liquidity"} target="_blank">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2" color="primary">
            {address}
          </Typography>
          <Launch color="primary" />
        </Stack>
      </Link>
    </Stack>
  </Stack>
);

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => (
  <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>
    <Stack direction="row" alignItems={"center"} spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
      <Tooltip
        enterDelay={200}
        arrow
        placement="top"
        title={
          <Typography>
            {TOOLTIPS[label.toLowerCase() as keyof typeof TOOLTIPS]}
          </Typography>
        }
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

function generateLiquidityURL(token1?: Address, token2?: Address) {
  return `https://aerodrome.finance/deposit?token0=${token1}&token1=${token2}`;
}

const usePersistedState = (key: string, initialValue: any) => {
  const [state, setState] = React.useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

export const AutoCompounderForm: React.FC = () => {
  const router = useRouter();
  const { tokens } = router.query;
  const { address } = useAccount();
  const [showModal, setShowModal] = React.useState(false);

  const defaultToken = React.useMemo(() => {
    if (!tokens || typeof tokens !== "string")
      return LIQUIDITY_POOLS["weth-klima"];
    return LIQUIDITY_POOLS[tokens] || LIQUIDITY_POOLS["weth-klima"];
  }, [tokens]);

  const [pool, setPool] = usePersistedState(
    "autoCompounder_pool",
    defaultToken.name
  );
  const [amount, setAmount] = usePersistedState("autoCompounder_amount", "");
  const [error, setError] = React.useState("");

  const selectedLP = React.useMemo(
    () => Object.values(LIQUIDITY_POOLS).find((token) => token.name === pool),
    [pool]
  );

  // Balance loading state
  const { data: lpBalance, isLoading: isBalanceLoading } = useBalance({
    address: "0x8196e813CfebE75d38D44Ce6275Dfa29028E56B9",
    token: selectedLP?.address as `0x${string}`,
    watch: true,
  });

  const formattedBalance = React.useMemo(
    () => (lpBalance ? lpBalance.formatted : "0"),
    [lpBalance]
  );

  const handlePoolChange = (event: SelectChangeEvent<string>) => {
    const newPool = event.target.value;
    setPool(newPool);
    setAmount("");
    setError("");

    const lpId = Object.entries(LIQUIDITY_POOLS).find(
      ([, token]) => token.name === newPool
    )?.[0];

    if (lpId) {
      router.push(`/auto-compounder/deposit/${lpId}`);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Only allow numbers and decimals
    if (!/^\d*\.?\d*$/.test(value)) return;

    // Validate against balance
    if (Number(value) > Number(formattedBalance)) {
      setError("Amount exceeds balance");
    } else {
      setError("");
    }

    setAmount(value);
  };

  const handleMaxClick = () => {
    setAmount(formattedBalance);
    setError("");
  };

  const isDepositDisabled = React.useMemo(() => {
    if (!address) return true;
    if (!amount || Number(amount) <= 0) return true;
    if (Number(amount) > Number(formattedBalance)) return true;
    if (Number(formattedBalance) === 0) return true;
    return false;
  }, [address, amount, formattedBalance]);

  const handleDeposit = () => {
    if (!isDepositDisabled) {
      setShowModal(true);
    }
  };

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const displayBalance = React.useMemo(() => {
    if (!isClient) return "-"; // Return placeholder during server render
    return isBalanceLoading ? (
      <CircularProgress size={16} sx={{ ml: 1 }} />
    ) : (
      formattedBalance || "0"
    );
  }, [isClient, isBalanceLoading, formattedBalance]);

  return (
    <StyledPaper elevation={0}>
      {/* Header - Kept unchanged */}
      <Stack spacing={1} width="100%">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Autorenew color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Auto Compounder
          </Typography>
        </Stack>
        <Typography variant="h6" color="text.secondary">
          Deposit your Aero LP tokens and auto-compound your rewards. You can
          withdraw your LP tokens at any time.
        </Typography>
      </Stack>

      {/* Pool Selection */}
      <Stack spacing={2} width="100%">
        <Stack spacing={1}>
          <Typography variant="body1">Pool</Typography>
          <StyledSelect
            value={isClient ? pool : ""} // Only set value on client
            onChange={handlePoolChange}
            IconComponent={KeyboardArrowDown}
            fullWidth
          >
            {Object.values(LIQUIDITY_POOLS).map((token) => (
              <MenuItem key={token.id} value={token.name}>
                {token.name}
              </MenuItem>
            ))}
          </StyledSelect>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Balance: {displayBalance}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href={generateLiquidityURL(
              selectedLP?.tokenA.address,
              selectedLP?.tokenB.address
            )}
            target="_blank"
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body1" color="primary">
                Add Liquidity
              </Typography>
              <Launch color="primary" />
            </Stack>
          </Link>

          <Tooltip
            arrow
            enterDelay={100}
            placement="top"
            title={<Typography>{TOOLTIPS["addLiquidity"]}</Typography>}
            sx={{
              "& .MuiTooltip-arrow": {
                color: "background.paper",
              },
            }}
          >
            <IconButton size="small">
              <HelpOutline fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Deposit Amount */}
      <Stack width="100%">
        <Stack spacing={1}>
          <Typography variant="body1">Amount to Deposit</Typography>
          <StyledInputWrapper error={!!error}>
            <CustomInputBase
              type="text"
              fullWidth
              value={isClient ? amount : ""} // Only set value on client
              onChange={handleAmountChange}
              placeholder="0.0"
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    height: "100%",
                    mr: 0,
                  }}
                >
                  <MaxButton
                    onClick={handleMaxClick}
                    disableRipple
                    disabled={!isClient || !Number(formattedBalance)}
                  >
                    MAX
                  </MaxButton>
                </InputAdornment>
              }
            />
          </StyledInputWrapper>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </Stack>
        <Stack py={"4px"} spacing={0.5}>
          <AddressDisplay
            label="Vault:"
            address={selectedLP?.vault || "0x123...ABC"}
          />
          <AddressDisplay label="Strategy:" address="0x123...ABC" />
        </Stack>
      </Stack>

      {/* Stats - Kept unchanged */}
      <Stack spacing={1} width="100%">
        <StatDisplay label="APY" value="123%" />
        <StatDisplay label="APR" value="123%" />
      </Stack>

      {/* Info Box - Kept unchanged */}
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
            <Favorite color="primary" />
            <Typography variant="h6">You're making a difference.</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ pl: 3.5 }}>
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
        disabled={!isClient || isDepositDisabled}
        sx={{
          fontSize: "16px",
          height: "48px",
          fontWeight: 600,
          bgcolor: "primary",
          color: "background.paper",
          "&:hover": {
            bgcolor: "text.secondary",
          },
          "&:disabled": {
            bgcolor: "action.disabledBackground",
            color: "action.disabled",
          },
        }}
      >
        {!isClient ? "Loading..." : !address ? "Connect Wallet" : "DEPOSIT"}
      </Button>

      {/* Deposit Modal */}
      {isClient && showModal && selectedLP && (
        <DepositConfirmationModal
          open={showModal}
          onClose={() => setShowModal(false)}
          amount={amount}
          lpToken={selectedLP}
          onSuccess={() => {
            setShowModal(false);
            setAmount("");
          }}
        />
      )}
    </StyledPaper>
  );
};
