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
import { useBeefyVaultsData } from "hooks/useBeefyVaultsData";
import { useGaugeRewards } from "hooks/useGaugeRewards";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Address, useAccount, useBalance, usePublicClient } from "wagmi";
import StakeConfirmationModal from "../Modals/StakeConfirmationModal";
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
  depositLiquidity:
    "You can use Aerodrome to deposit liquidity into a pool and use those LPs for this transaction.",
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

const AddressDisplay: React.FC<AddressDisplayProps> = ({ label, address }) => {
  const publicClient = usePublicClient();

  const explorerUrl = publicClient.chain.blockExplorers?.default.url;
  const addressUrl = `${explorerUrl}/address/${address}`;

  return (
    <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href={addressUrl} target="_blank">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" color="primary">
              {address ? shortenAddress(address) : "-"}
            </Typography>
            <Launch color="primary" />
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

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
  return `https://aerodrome.finance/deposit?token0=${token1}&token1=${token2}&type=-1`;
}

export const AutoCompounderStakeForm: React.FC = () => {
  const router = useRouter();
  const { token: tokens } = router.query;

  const { lps } = useAvailableLP();

  const { address } = useAccount();
  const [showModal, setShowModal] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");

  const defaultToken = React.useMemo(() => {
    // Wait for both router and LPs to be ready
    if (!router.isReady || !lps || Object.keys(lps).length === 0) {
      return null;
    }

    // No tokens in URL - return first LP
    if (!tokens || typeof tokens !== "string") {
      return Object.values(lps)[0];
    }

    // URL tokens are already lowercase from StaketList
    const [token1, token2] = tokens.split("-");

    // Find matching LP - compare URL tokens with UPPERCASE LP tokens
    const match = Object.values(lps).find((lp) => {
      const lpToken1 = lp.tokenA.name.toLowerCase();
      const lpToken2 = lp.tokenB.name.toLowerCase();

      return (
        (lpToken1 === token1 && lpToken2 === token2) ||
        (lpToken1 === token2 && lpToken2 === token1)
      );
    });

    return match || Object.values(lps)[0];
  }, [router.isReady, tokens, lps]);

  const [pool, setPool] = React.useState(defaultToken?.name ?? "");

  React.useEffect(() => {
    if (defaultToken?.name) {
      setPool(defaultToken.name);
    }
  }, [defaultToken]);

  const { data: vaultsData, isLoading: isVaultDataLoading } =
    useBeefyVaultsData();

  const selectedLP = React.useMemo(
    () => Object.values(lps).find((lp) => lp.name === pool),
    [pool, lps]
  );

  const selectedVault = React.useMemo(
    () => vaultsData?.find((v) => v.address === selectedLP?.vault),
    [vaultsData, selectedLP]
  );

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: lpBalance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: selectedLP?.poolAddress as `0x${string}`,
    watch: true,
  });

  const formattedBalance = React.useMemo(
    () => (lpBalance ? lpBalance.formatted : "0"),
    [lpBalance]
  );

  const handlePoolChange = (event: SelectChangeEvent<unknown>) => {
    const newPool = event.target.value as string;
    setPool(newPool);
    setAmount("");
    setError("");

    const selectedLp = Object.values(lps).find((lp) => lp.name === newPool);
    if (selectedLp) {
      const tokens = `${selectedLp.tokenA.name.toLowerCase()}-${selectedLp.tokenB.name.toLowerCase()}`;
      router.push(`/auto-compounder/stake/${tokens}`);
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

  const isStakeDisabled = React.useMemo(() => {
    if (!address) return true;
    if (!amount || Number(amount) <= 0) return true;
    if (Number(amount) > Number(formattedBalance)) return true;
    if (Number(formattedBalance) === 0) return true;
    return false;
  }, [address, amount, formattedBalance]);

  const handleStake = () => {
    if (!isStakeDisabled) {
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

  const { apr, apy } = useGaugeRewards({
    gaugeAddress: selectedLP?.gaugeAddress ?? "0x",
    lpAddress: selectedLP?.poolAddress ?? "0x",
  });

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
          Stake your Aero LP tokens and auto-compound your rewards. You can
          unstake your LP tokens at any time.
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
              <MenuItem key={lp.poolAddress} value={lp.name}>
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
                Deposit Liquidity
              </Typography>
              <Launch color="primary" />
            </Stack>
          </Link>

          <Tooltip
            arrow
            enterDelay={100}
            placement="top"
            title={<Typography>{TOOLTIPS["depositLiquidity"]}</Typography>}
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
          <Typography variant="body1">Amount to Stake</Typography>
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
          <AddressDisplay
            label="KlimaVault:"
            address={selectedVault?.address}
          />
          <AddressDisplay
            label="KlimaAerodromeStrategy:"
            address={selectedVault?.strategy}
          />
        </Stack>
      </Stack>

      <Stack spacing={1} width="100%">
        <StatDisplay label="APY" value={`${apy.toFixed(2) ?? "-"}%`} />
        <StatDisplay label="APR" value={`${apr.toFixed(2) ?? "-"}%`} />
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
        onClick={handleStake}
        disabled={!isClient || isStakeDisabled}
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
        Stake
      </Button>

      {isClient && showModal && selectedLP && (
        <StakeConfirmationModal
          open={showModal}
          onClose={() => setShowModal(false)}
          amount={amount}
          lpToken={selectedLP}
          onSuccess={() => {
            setShowModal(false);
            setAmount("");
            router.push(`/auto-compounder/positions`);
          }}
        />
      )}
    </StyledPaper>
  );
};
