import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  Box,
  Button,
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
import React from "react";
import {
  DataPairContainer,
  MobilePositionWrapper,
  TopRowContainer,
  WithdrawButton,
} from "./styles";

interface Position {
  token0: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  token1: "BCT" | "WETH" | "USDC" | "AERO" | "KLIMA";
  poolValue: number;
  balance: {
    usd: number;
    lpTokens: number;
  };
  yield: {
    usd: number;
    lpTokens: number;
  };
  tvl: {
    usd: number;
    vaultTokens: number;
  };
}

interface PositionsTableProps {
  positions: Position[];
  onWithdraw: (position: Position) => void;
}

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

interface MobilePositionProps {
  position: Position;
  onWithdraw: (position: Position) => void;
}

const MobilePosition: React.FC<MobilePositionProps> = ({
  position,
  onWithdraw,
}) => (
  <MobilePositionWrapper>
    <TopRowContainer>
      <TokenPairLogo token1={position.token0} token2={position.token1} />
      <Stack>
        <Typography variant="body1" fontWeight={700}>
          {`${position.token0}/${position.token1}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatUSD(position.poolValue)}
        </Typography>
      </Stack>
    </TopRowContainer>

    <Box display="flex">
      <DataPairContainer>
        <Typography>{formatUSD(position.balance.usd)}</Typography>
        <Typography variant="caption" fontWeight={600}>
          BALANCE
        </Typography>
      </DataPairContainer>
      <DataPairContainer>
        <Typography align="right">{position.balance.lpTokens}</Typography>
        <Typography variant="caption" fontWeight={600} align="right">
          TOTAL LP TOKENS
        </Typography>
      </DataPairContainer>
    </Box>

    <Box display="flex">
      <DataPairContainer>
        <Typography>{formatUSD(position.yield.usd)}</Typography>
        <Typography variant="caption" fontWeight={600}>
          YIELD ACCRUED
        </Typography>
      </DataPairContainer>
      <DataPairContainer>
        <Typography align="right">{position.yield.lpTokens}</Typography>
        <Typography variant="caption" fontWeight={600} align="right">
          ACCRUED LP TOKENS
        </Typography>
      </DataPairContainer>
    </Box>

    <Box display="flex">
      <DataPairContainer>
        <Typography>{formatUSD(position.tvl.usd)}</Typography>
        <Typography variant="caption" fontWeight={600}>
          TVL
        </Typography>
      </DataPairContainer>
      <DataPairContainer>
        <Typography align="right">{position.tvl.vaultTokens}</Typography>
        <Typography variant="caption" fontWeight={600} align="right">
          VAULT TOKENS
        </Typography>
      </DataPairContainer>
    </Box>

    <WithdrawButton onClick={() => onWithdraw(position)}>
      <Typography color="primary">Withdraw</Typography>
      <SwapHorizIcon color="primary" sx={{ width: 20, height: 20 }} />
    </WithdrawButton>
  </MobilePositionWrapper>
);

export const AutoCompounderPositionsTable: React.FC<PositionsTableProps> = ({
  positions,
  onWithdraw,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Box p={2}>
        {positions.map((position, index) => (
          <MobilePosition
            key={index}
            position={position}
            onWithdraw={onWithdraw}
          />
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ bgcolor: theme.palette.background.default }}>
        <TableHead
          sx={{
            bgcolor: theme.palette.background.paper,
          }}
        >
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                POOL
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                BALANCE
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                {" "}
                YIELD ACCRUED
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                TVL
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                ACTION
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <TokenPairLogo
                    token1={position.token0}
                    token2={position.token1}
                  />
                  <Stack>
                    <Typography>
                      {`${position.token0}/${position.token1}`}
                    </Typography>
                    <Typography color="text.secondary">
                      {formatUSD(position.poolValue)}
                    </Typography>
                  </Stack>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography>{formatUSD(position.balance.usd)}</Typography>
                <Typography color="text.secondary">
                  {`${position.balance.lpTokens} LP Tokens`}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{formatUSD(position.yield.usd)}</Typography>
                <Typography color="text.secondary">
                  {`${position.yield.lpTokens} LP Tokens`}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{formatUSD(position.tvl.usd)}</Typography>
                <Typography color="text.secondary">
                  {`${position.tvl.vaultTokens} Vault Tokens`}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button onClick={() => onWithdraw(position)}>
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                      <Typography color="primary">Withdraw</Typography>
                      <SwapHorizIcon />
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
