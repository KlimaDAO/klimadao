import { css } from "@emotion/css";
import { Anchor } from "@klimadao/lib/components";
import {
  Autorenew,
  Favorite,
  HelpOutline,
  KeyboardArrowDown,
  Launch,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { useAvailableLP } from "hooks/useAvailablePool";
import { useBeefyVaultsData } from "hooks/useBeefyVaultsData";
import { useGaugeRewards } from "hooks/useGaugeRewards";
import { LiquidityPool } from "lib/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Address, useAccount, useBalance, usePublicClient } from "wagmi";
import StakeConfirmationModal from "../Modals/StakeConfirmationModal";
import SuccessModal from "../Modals/SuccessModal";
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

const tooltipSlotProps = {
  popper: {
    modifiers: [{ name: "offset", options: { offset: [0, -20] } }],
  },
};

function generateLiquidityURL(token1?: Address, token2?: Address) {
  return `https://aerodrome.finance/deposit?token0=${token1}&token1=${token2}&type=-1`;
}

export const shortenAddress = (
  address: string,
  prefixLength = 6,
  suffixLength = 4
) => {
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

// todo - move components out of this single file...
const CustomTooltip: FC<{ tooltipText: string }> = ({ tooltipText }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  return (
    <Tooltip
      arrow
      placement="top"
      enterDelay={100}
      enterTouchDelay={0}
      open={tooltipOpen}
      onClose={() => setTooltipOpen(false)}
      slotProps={isMobile ? tooltipSlotProps : {}}
      title={<Typography>{tooltipText}</Typography>}
      sx={{
        "& .MuiTooltip-arrow": {
          color: "background.paper",
        },
      }}
    >
      <IconButton
        size="small"
        sx={{ color: "#9C9C9C" }}
        onClick={() => setTooltipOpen(true)}
      >
        <HelpOutline fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
};

const AddressDisplay: FC<AddressDisplayProps> = ({ label, address }) => {
  const publicClient = usePublicClient();
  const explorerUrl = publicClient.chain.blockExplorers?.default.url;
  const addressUrl = `${explorerUrl}/address/${address}`;

  return (
    <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        {label}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href={addressUrl} target="_blank">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body1" color="primary" fontWeight={500}>
              {address ? shortenAddress(address) : "-"}
            </Typography>
            <Launch color="primary" />
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const StatDisplay: FC<StatDisplayProps> = ({ label, value }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <Typography variant="body1" color="text.secondary" fontWeight={500}>
      {label}
    </Typography>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        {value}
      </Typography>
      <CustomTooltip
        tooltipText={TOOLTIPS[label.toLowerCase() as keyof typeof TOOLTIPS]}
      />
    </Stack>
  </Stack>
);

const MenuItemContent: FC<{ lp: LiquidityPool }> = ({ lp }) => {
  const { data: vaultData } = useBeefyVaultsData();
  const vault = vaultData?.find((e) => e.address === lp.vault);
  const { apr } = useGaugeRewards({
    gaugeAddress: lp.gaugeAddress,
    lpAddress: lp.poolAddress,
  });

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography variant="h6">{lp.name}</Typography>
      <Box display="flex" justifyContent="space-between" gap={1}>
        <Typography variant="body2" color="#9C9C9C">
          {(vault?.vaultValueUSD ?? 0).toLocaleString(undefined, {
            currency: "USD",
            style: "currency",
          })}
        </Typography>
        <Typography variant="body2" color="#9C9C9C">
          {apr.toFixed(2)}% APR
        </Typography>
      </Box>
    </Box>
  );
};

export const StakeForm: FC = () => {
  const router = useRouter();
  const { token: tokens } = router.query;
  const { lps } = useAvailableLP();

  const { address } = useAccount();
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
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
      formattedBalance || "0.0"
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
          <Autorenew sx={{ width: "2rem", height: "2rem" }} />
          <Typography variant="h5" fontWeight={700}>
            Auto Compounder
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          color="#ddd"
          fontWeight={400}
          lineHeight="2rem"
        >
          Stake your{" "}
          <Anchor
            className={css`
              text-decoration: underline;
            `}
            href="https://aerodrome.finance/liquidity"
          >
            Aero LP tokens
          </Anchor>{" "}
          and auto-compound your rewards. You can unstake your LP tokens at any
          time.
        </Typography>
      </Stack>

      <Stack spacing={1} width="100%">
        <Stack spacing={1}>
          <Typography
            variant="body1"
            fontWeight={500}
            fontSize="1.6rem"
            lineHeight="2.4rem"
          >
            Pool
          </Typography>
          <StyledSelect
            fullWidth
            value={isClient ? pool : ""}
            onChange={handlePoolChange}
            IconComponent={KeyboardArrowDown}
            renderValue={() => (
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {pool}
              </Box>
            )}
          >
            {Object.values(lps).map((lp) => (
              <MenuItem key={lp.poolAddress} value={lp.name}>
                <MenuItemContent lp={lp} />
              </MenuItem>
            ))}
          </StyledSelect>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            Balance: {displayBalance}
          </Typography>
        </Stack>
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
              <Typography variant="body1" color="primary" fontWeight={500}>
                Deposit Liquidity
              </Typography>
              <Launch color="primary" />
            </Stack>
          </Link>
          <CustomTooltip tooltipText={TOOLTIPS["depositLiquidity"]} />
        </Stack>
      </Stack>

      <Stack width="100%">
        <Stack spacing={1}>
          <Typography
            variant="body1"
            fontWeight={500}
            fontSize="1.6rem"
            lineHeight="2.4rem"
          >
            Amount to Stake
          </Typography>
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
                    disabled={!isClient || !Number(formattedBalance)}
                  >
                    MAX
                  </MaxButton>
                </InputAdornment>
              }
            />
          </StyledInputWrapper>
          {error && (
            <Typography variant="caption" color="error" fontSize="1.4rem">
              {error}
            </Typography>
          )}
        </Stack>
        <Stack py="0.8rem" spacing={0.5}>
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
      <Stack width="100%">
        <StatDisplay label="APY" value={`${apy.toFixed(2) ?? "-"}%`} />
        <StatDisplay label="APR" value={`${apr.toFixed(2) ?? "-"}%`} />
      </Stack>
      <Paper
        sx={{
          p: 1.5,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Favorite color="primary" />
            <Typography variant="h6">You're making a difference.</Typography>
          </Stack>
          <Typography
            variant="body1"
            fontWeight={500}
            lineHeight="1.8rem"
            color="text.secondary"
            sx={{ pl: 3.5 }}
          >
            We automatically redirect 1% of your LP yield to burn KLIMA and
            retire the underlying carbon credits.
          </Typography>
        </Stack>
      </Paper>

      <ButtonPrimary
        label="STAKE"
        onClick={handleStake}
        className={css({ width: "100%" })}
        disabled={!isClient || isStakeDisabled}
      />

      {isClient && showModal && selectedLP && (
        <StakeConfirmationModal
          open={showModal}
          onClose={() => setShowModal(false)}
          amount={amount}
          lpToken={selectedLP}
          onSuccess={() => {
            setShowModal(false);
            setShowSuccessModal(true);
            setAmount("");
          }}
        />
      )}
      {selectedLP && showSuccessModal && (
        <SuccessModal
          open={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
          }}
          content={
            <>
              <Typography variant="body1">
                You’ve successfully staked {selectedLP.name} into the auto
                compounder.
              </Typography>
              <Typography variant="body1">
                You can view the status of your stake under the “Your Positions”
                tab.
              </Typography>
            </>
          }
        />
      )}
    </StyledPaper>
  );
};
