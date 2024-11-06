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
import { useBeefyVaultsData, VaultInfo } from "hooks/useBeefyVaultQueries";
import { useRouter } from "next/router";
import {
  DataPairContainer,
  DepositButton,
  MobileItemWrapper,
  RowContainer,
} from "./styles";

import { LiquidityPool } from "lib/constants";
import { formatUnits } from "viem";

export interface TokenPair {
  token1: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  token2: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  apy: number;
  daily: number;
  tvl: number;
}

interface MobileDepositItemProps {
  vault?: VaultInfo;
  lp: LiquidityPool;
  onDeposit: (token1: string, token2: string) => void;
}

const MobileDepositItem: React.FC<MobileDepositItemProps> = ({
  lp,
  vault,
  onDeposit,
}) => (
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
        <Typography variant="body1">{vault?.apy ?? "-"}%</Typography>
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
          {(vault?.balanceUSD ?? 0).toLocaleString(undefined, {
            currency: "USD",
            style: "currency",
          })}
        </Typography>
        <Typography variant="caption" fontWeight={600} color={"text.secondary"}>
          TVL
        </Typography>
      </DataPairContainer>
      <DataPairContainer>
        <Typography align="right" variant="body1">
          {vault?.dailyRate ?? "-"}%
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
      <DepositButton onClick={() => onDeposit(lp.tokenA.name, lp.tokenB.name)}>
        <Typography color="primary">Deposit</Typography>
        <AddIcon color="primary" sx={{ width: 20, height: 20 }} />
      </DepositButton>
    </RowContainer>
  </MobileItemWrapper>
);

export const DepositList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const { lps } = useAvailableLP();

  const { data: vaultData, isLoading: isVaultDataLoading } =
    useBeefyVaultsData();

  const handleDeposit = (token1: string, token2: string) => {
    router.push(
      `/auto-compounder/deposit/${token1.toLowerCase()}-${token2.toLowerCase()}`
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
          <MobileDepositItem
            key={`${lp.tokenA.name}-${lp.tokenB.name}-${index}`}
            lp={lp}
            vault={vaultData?.find((e) => e.address === lp.vault)}
            onDeposit={handleDeposit}
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
            <TableCell align="right">
              <Typography py={0.75} variant="body2" fontWeight={600}>
                ACTION
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(lps).map((lp, index) => (
            <TableRow key={`${lp.tokenA}-${lp.tokenB}-${index}`}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <TokenPairLogo
                    token1={lp.tokenA.name}
                    token2={lp.tokenB.name}
                  />
                  <Typography variant="body1" fontWeight={600}>
                    {`${lp.tokenA.name}/${lp.tokenB.name}`}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  {vaultData?.find((e) => e.address === lp.vault)?.apy ?? "-"}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  {vaultData?.find((e) => e.address === lp.vault)?.dailyRate ??
                    "-"}
                  %
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Stack>
                  <Typography fontWeight={600}>
                    {(
                      vaultData?.find((e) => e.address === lp.vault)
                        ?.balanceUSD ?? 0
                    ).toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "symbol",
                      currencySign: "standard",
                    })}
                  </Typography>
                  <Typography variant="body1" color={"text.secondary"}>
                    {formatUnits(
                      vaultData?.find((e) => e.address === lp.vault)?.balance ??
                        BigInt(0),
                      vaultData?.find((e) => e.address === lp.vault)
                        ?.decimals ?? 18
                    ) ?? "-"}{" "}
                    {lp.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    onClick={() =>
                      handleDeposit(lp.tokenA.name, lp.tokenB.name)
                    }
                  >
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                      <Typography color="primary">Deposit</Typography>
                      <AddIcon />
                    </Stack>
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
