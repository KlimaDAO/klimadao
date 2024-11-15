import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TokenPairLogo } from "components/Logos/TokenPairLogos";
import { useAvailableLP } from "hooks/useAvailablePool";
import { useBeefyVaultsData } from "hooks/useBeefyVaultsData";
import { useGaugeRewards } from "hooks/useGaugeRewards";
import { formatUSD } from "lib/str-format";
import { LiquidityPool, VaultInfo } from "lib/types";
import { useRouter } from "next/router";
import {
  DataPairContainer,
  MobileItemWrapper,
  RowContainer,
  StakeButton,
} from "./styles";

export interface TokenPair {
  token1: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  token2: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  apy: number;
  daily: number;
  tvl: number;
}

export const StakeList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const { lps } = useAvailableLP();

  const { data: vaultData, isLoading: isVaultDataLoading } =
    useBeefyVaultsData();

  const handleStake = (token1: string, token2: string) => {
    router.push(
      `/auto-compounder/stake/${token1.toLowerCase()}-${token2.toLowerCase()}`
    );
  };

  if (isVaultDataLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box display="flex" flexDirection="column" px={1} py={0.5} rowGap={1}>
        {Object.values(lps).map((lp, index) => (
          <MobileStakeItem
            key={`${lp.tokenA.name}-${lp.tokenB.name}-${index}`}
            lp={lp}
            vault={vaultData?.find((e) => e.address === lp.vault)}
            onStake={handleStake}
          />
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ bgcolor: theme.palette.background.default }}>
        <TableHead sx={{ bgcolor: theme.palette.background.paper }}>
          <TableRow>
            <TableCell>
              <Typography py={0.75} variant="body2" fontWeight={600}>
                POOL
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography py={0.75} variant="body2" fontWeight={600}>
                APY
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography py={0.75} variant="body2" fontWeight={600}>
                DAILY
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography py={0.75} variant="body2" fontWeight={600}>
                TVL
              </Typography>
            </TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(lps).map((lp, index) => (
            <DesktopTableRow
              key={lp.poolAddress + index}
              lp={lp}
              vault={vaultData?.find((vd) => vd.address === lp.vault)}
              handleStake={handleStake}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DesktopTableRow = ({
  lp,
  vault,
  handleStake,
}: {
  lp: LiquidityPool;
  vault?: VaultInfo;
  handleStake: (_a: string, _b: string) => void;
}) => {
  const { apy, dailyRate } = useGaugeRewards({
    gaugeAddress: lp.gaugeAddress,
    lpAddress: lp.poolAddress,
  });

  if (!vault) {
    return null;
  }

  return (
    <TableRow key={`${lp.tokenA}-${lp.tokenB}`}>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <TokenPairLogo token1={lp.tokenA.name} token2={lp.tokenB.name} />
          <Typography variant="body1" fontWeight={500}>
            {`${lp.tokenA.name}/${lp.tokenB.name}`}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1">{apy ? apy.toFixed(2) : "-"}%</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1">
          {dailyRate ? dailyRate.toFixed(2) : "-"}%
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Stack>
          <Typography fontWeight={600}>
            {formatUSD(vault.vaultValueUSD ?? 0, true)}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Button onClick={() => handleStake(lp.tokenA.name, lp.tokenB.name)}>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography
                color="primary"
                fontWeight={500}
                sx={{ textTransform: "initial" }}
              >
                Stake
              </Typography>
              <AddIcon />
            </Stack>
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
interface MobileStakeItemProps {
  vault?: VaultInfo;
  lp: LiquidityPool;
  onStake: (token1: string, token2: string) => void;
}

const MobileStakeItem: React.FC<MobileStakeItemProps> = ({
  lp,
  vault,
  onStake,
}) => {
  const { apy, dailyRate } = useGaugeRewards({
    gaugeAddress: lp.gaugeAddress,
    lpAddress: lp.poolAddress,
  });

  if (!vault) {
    return null;
  }

  return (
    <MobileItemWrapper>
      <RowContainer>
        <Box display={"flex"} alignItems={"center"} gap={0.5} py={0.5}>
          <TokenPairLogo token1={lp.tokenA.name} token2={lp.tokenB.name} />
          <Stack>
            <Typography variant="body1" fontWeight={600}>
              {`${lp.tokenA.name}/${lp.tokenB.name}`}
            </Typography>
          </Stack>
        </Box>
        <DataPairContainer>
          <Typography variant="body1">{apy ? apy.toFixed(2) : "-"}%</Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            align="right"
            color={"text.secondary"}
          >
            APY
          </Typography>
        </DataPairContainer>
      </RowContainer>
      <RowContainer>
        <DataPairContainer>
          <Typography variant="body1">
            {(vault?.vaultValueUSD ?? 0).toLocaleString(undefined, {
              currency: "USD",
              style: "currency",
            })}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            color={"text.secondary"}
          >
            TVL
          </Typography>
        </DataPairContainer>
        <DataPairContainer>
          <Typography align="right" variant="body1">
            {dailyRate ? dailyRate.toFixed(2) : "-"}%
          </Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            align="right"
            color={"text.secondary"}
          >
            DAILY
          </Typography>
        </DataPairContainer>
      </RowContainer>
      <RowContainer>
        <StakeButton onClick={() => onStake(lp.tokenA.name, lp.tokenB.name)}>
          <Typography color="primary">Stake</Typography>
          <AddIcon color="primary" sx={{ width: 20, height: 20 }} />
        </StakeButton>
      </RowContainer>
    </MobileItemWrapper>
  );
};
