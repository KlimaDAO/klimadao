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

import { useAvailableLP } from "hooks/useAvailablePool";
import { useBeefyVaultsData } from "hooks/useBeefyVaultQueries";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getAddress } from "viem";
import { Address, useAccount, useBalance } from "wagmi";
import DepositConfirmationModal from "../Modals/DepositConfirmationModal";
import {
  CustomInputBase,
  MaxButton,
  StyledInputWrapper,
  StyledPaper,
  StyledSelect,
} from "./styles";

interface AddressDisplayProps {
  label: string;
  address?: string;
}

interface StatDisplayProps {
  label: string;
  value: string;
}

const TOOLTIPS = {
  addLiquidity: "Add liquidity to the pool to get LP tokens",
  apy: "Annual Percentage Yield (APY) includes compound interest, showing total returns over one year",
  apr: "Annual Percentage Rate (APR) shows the simple interest rate without compounding",
  vault: "Smart contract that holds your LP tokens",
  strategy: "Smart contract that automates the compounding strategy",
};

export const shortenAddress = (
  address: string,
  prefixLength = 6,
  suffixLength = 4
) => {
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

const AddressDisplay: React.FC<AddressDisplayProps> = ({ label, address }) => (
  <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>

    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Link href={"https://aerodrome.finance/liquidity"} target="_blank">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2" color="primary">
            {address ? shortenAddress(getAddress(address)) : "-"}
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

export const AutoCompounderDepositForm: React.FC = () => {
  const router = useRouter();
  const { tokens } = router.query;
  const { address } = useAccount();
  const [showModal, setShowModal] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  const { lps } = useAvailableLP();
  const { data: vaultData, isLoading: isVaultDataLoading } =
    useBeefyVaultsData();

  const defaultToken = React.useMemo(() => {
    if (!tokens || typeof tokens !== "string") return Object.values(lps)[0];
    const [token1, token2] = tokens.split("-");
    return (
      Object.values(lps).find(
        (lp) =>
          lp.tokenA.name.toLowerCase() === token1 &&
          lp.tokenB.name.toLowerCase() === token2
      ) || Object.values(lps)[0]
    );
  }, [tokens, lps]);

  const [pool, setPool] = React.useState(defaultToken?.name ?? "");
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (defaultToken?.name) {
      setPool(defaultToken.name);
    }
  }, [defaultToken]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedLP = React.useMemo(
    () => Object.values(lps).find((lp) => lp.name === pool),
    [pool, lps]
  );

  const selectedVault = React.useMemo(
    () => vaultData?.find((v) => v.address === selectedLP?.vault),
    [vaultData, selectedLP]
  );

  const { data: lpBalance, isLoading: isBalanceLoading } = useBalance({
    address,
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

    const selectedLp = Object.values(lps).find((lp) => lp.name === newPool);
    if (selectedLp) {
      const tokens = `${selectedLp.tokenA.name.toLowerCase()}-${selectedLp.tokenB.name.toLowerCase()}`;
      router.push(`/auto-compounder/deposit/${tokens}`);
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

  const displayBalance = React.useMemo(() => {
    if (!isClient) return "-";
    return isBalanceLoading || isVaultDataLoading ? (
      <CircularProgress size={16} sx={{ ml: 1 }} />
    ) : (
      formattedBalance || "0"
    );
  }, [isClient, isBalanceLoading, isVaultDataLoading, formattedBalance]);

  return (
    <StyledPaper elevation={0}>
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

      <Stack spacing={1} width="100%">
        <Stack spacing={1}>
          <Typography variant="body1">Pool</Typography>
          <StyledSelect
            value={isClient ? pool : ""}
            onChange={handlePoolChange}
            IconComponent={KeyboardArrowDown}
            fullWidth
          >
            {Object.values(lps).map((lp) => (
              <MenuItem key={lp.address} value={lp.name}>
                {lp.name}
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

      <Stack width="100%">
        <Stack spacing={1}>
          <Typography variant="body1">Amount to Deposit</Typography>
          <StyledInputWrapper error={!!error}>
            <CustomInputBase
              type="text"
              fullWidth
              value={isClient ? amount : ""}
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
          <AddressDisplay label="Vault:" address={selectedVault?.address} />
          <AddressDisplay label="Strategy:" address={selectedVault?.strategy} />
        </Stack>
      </Stack>

      <Stack spacing={1} width="100%">
        <StatDisplay label="APY" value={`${selectedVault?.apy ?? "-"}%`} />
        <StatDisplay
          label="APR"
          value={`${selectedVault?.dailyRate ?? "-"}%`}
        />
      </Stack>

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
        {"DEPOSIT"}
      </Button>

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
