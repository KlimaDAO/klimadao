import AddIcon from "@mui/icons-material/Add";
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
import { useRouter } from "next/router";
import {
  DataPairContainer,
  DepositButton,
  MobileItemWrapper,
  TopRowContainer,
} from "./styles";

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

interface MobileDepositItemProps {
  pair: TokenPair;
  onDeposit: (token1: string, token2: string) => void;
}

export const MobileDepositItem: React.FC<MobileDepositItemProps> = ({
  pair,
  onDeposit,
}) => (
  <MobileItemWrapper>
    <TopRowContainer>
      <TokenPairLogo token1={pair.token1} token2={pair.token2} />
      <Stack>
        <Typography variant="body1" fontWeight={700}>
          {`${pair.token1}/${pair.token2}`}
        </Typography>
      </Stack>
    </TopRowContainer>

    <Box display="flex" width="324px">
      <DataPairContainer>
        <Typography variant="body1">{pair.apy}%</Typography>
        <Typography variant="caption" fontWeight={600}>
          APY
        </Typography>
      </DataPairContainer>
      <DataPairContainer>
        <Typography align="right">{pair.daily}%</Typography>
        <Typography variant="caption" fontWeight={600} align="right">
          DAILY
        </Typography>
      </DataPairContainer>
    </Box>

    <Box display="flex" width="324px">
      <DataPairContainer>
        <Typography variant="body1">${pair.tvl.toLocaleString()}</Typography>
        <Typography variant="caption" fontWeight={600}>
          TVL
        </Typography>
      </DataPairContainer>
    </Box>

    <DepositButton onClick={() => onDeposit(pair.token1, pair.token2)}>
      <Typography color="primary">Deposit</Typography>
      <AddIcon color="primary" sx={{ width: 20, height: 20 }} />
    </DepositButton>
  </MobileItemWrapper>
);

export const DepositList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleDeposit = (token1: string, token2: string) => {
    router.push(
      `/auto-compounder/deposit/${token1.toLowerCase()}-${token2.toLowerCase()}`
    );
  };

  if (isMobile) {
    return (
      <Box p={2}>
        {MOCK_DATA.map((pair, index) => (
          <MobileDepositItem
            key={`${pair.token1}-${pair.token2}-${index}`}
            pair={pair}
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
              <Typography variant="body2" fontWeight={600}>
                POOL
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                APY
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body2" fontWeight={600}>
                DAILY
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
          {MOCK_DATA.map((pair, index) => (
            <TableRow key={`${pair.token1}-${pair.token2}-${index}`}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <TokenPairLogo token1={pair.token1} token2={pair.token2} />
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                  >
                    {`${pair.token1}/${pair.token2}`}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{pair.apy}%</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">{pair.daily}%</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">
                  ${pair.tvl.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    onClick={() => handleDeposit(pair.token1, pair.token2)}
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
