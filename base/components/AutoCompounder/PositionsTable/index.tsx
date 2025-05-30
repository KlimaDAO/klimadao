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
import SuccessModal from "components/AutoCompounder/Modals/SuccessModal";
import { WithdrawConfirmationModal } from "components/AutoCompounder/Modals/WithdrawConfirmationModal";
import { TokenPairLogo } from "components/Logos/TokenPairLogos";
import { formatTokenAmount, formatUSD } from "lib/str-format";
import { Position } from "lib/types";
import Link from "next/link";
import React, { FC } from "react";
import { CustomTooltip, TOOLTIPS } from "../CustomTooltip";
import {
  DataPairContainer,
  MobileItemWrapper,
  RowContainer,
  WithdrawButton,
} from "./styles";

interface PositionsTableProps {
  positions: Position[];
  refetchPositions: () => void;
}

interface MobilePositionProps {
  position: Position;
  onWithdraw: (position: Position) => void;
}

const MobilePosition: FC<MobilePositionProps> = ({ position, onWithdraw }) => {
  if (position.vaultBalance.vaultTokens === 0) {
    return null;
  }
  return (
    <MobileItemWrapper>
      <RowContainer>
        <Box display={"flex"} alignItems={"center"} gap={0.5} py={0.5}>
          <TokenPairLogo
            token1={position.lpToken.tokenA.name}
            token2={position.lpToken.tokenB.name}
          />
          <Stack>
            <Typography variant="body1" fontWeight={700}>
              {`${position.lpToken.tokenA.name}/${position.lpToken.tokenB.name}`}
            </Typography>
          </Stack>
        </Box>
      </RowContainer>
      <RowContainer>
        <DataPairContainer>
          <Box display="flex" gap="0.8rem" alignItems="center">
            <Typography>{formatUSD(position.lpBalance.usd)}</Typography>
            <CustomTooltip tooltipText={TOOLTIPS.balance} />
          </Box>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            BALANCE
          </Typography>
        </DataPairContainer>
        <DataPairContainer>
          <Typography align="right">
            {formatTokenAmount(position.lpBalance.lpTokens)}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            align="right"
            color="text.secondary"
          >
            TOTAL LP TOKENS
          </Typography>
        </DataPairContainer>
      </RowContainer>
      <RowContainer>
        <DataPairContainer>
          <Box display="flex" gap="0.8rem" alignItems="center">
            <Typography>
              {formatTokenAmount(position.vaultBalance.vaultTokens)}
            </Typography>
            <CustomTooltip tooltipText={TOOLTIPS.vaultTokens} />
          </Box>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            VAULT TOKENS
          </Typography>
        </DataPairContainer>
      </RowContainer>
      <RowContainer>
        <WithdrawButton onClick={() => onWithdraw(position)}>
          <Typography color="primary" sx={{ textTransform: "initial" }}>
            Unstake
          </Typography>
          <SwapHorizIcon color="primary" sx={{ width: 20, height: 20 }} />
        </WithdrawButton>
      </RowContainer>
    </MobileItemWrapper>
  );
};

export const PositionsTable: FC<PositionsTableProps> = ({
  positions,
  refetchPositions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedPosition, setSelectedPosition] =
    React.useState<Position | null>();

  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const onWithdraw = (position: Position) => {
    setSelectedPosition(position);
    setShowModal(true);
  };

  if (
    !positions ||
    positions.length === 0 ||
    positions.every((position) => position.vaultBalance.vaultTokens === 0)
  ) {
    return (
      <Box
        sx={{
          p: "12px",
          bgcolor: theme.palette.background.default,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" fontWeight={700} py={2}>
          No positions found
        </Typography>
        <Link href={"/auto-compounder/stake/all"}>Open a position</Link>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box display="flex" flexDirection="column" px={1} py={0.5} rowGap={1}>
        {positions.map((position, index) => (
          <MobilePosition
            key={index}
            position={position}
            onWithdraw={onWithdraw}
          />
        ))}
        {showModal && selectedPosition && (
          <WithdrawConfirmationModal
            open={showModal}
            position={selectedPosition}
            onSuccess={() => {
              setShowModal(false);
              setShowSuccessModal(true);
            }}
            onClose={() => {
              setSelectedPosition(null);
              refetchPositions();
            }}
          />
        )}

        {showSuccessModal && selectedPosition && (
          <SuccessModal
            open={showSuccessModal}
            onClose={() => {
              setShowSuccessModal(false);
            }}
            content={
              <Typography variant="body1">
                You’ve successfully unstaked {selectedPosition.lpToken.name}{" "}
                from the auto compounder.
              </Typography>
            }
          />
        )}
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ bgcolor: theme.palette.background.default }}>
          <TableHead
            sx={{
              bgcolor: theme.palette.background.paper,
            }}
          >
            <TableRow>
              <TableCell>
                <Typography py={0.75} variant="body2" fontWeight={600}>
                  POOL
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box
                  gap="0.8rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography py={0.75} variant="body2" fontWeight={600}>
                    BALANCE
                  </Typography>
                  <CustomTooltip tooltipText={TOOLTIPS.balance} />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box
                  gap="0.8rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography py={0.75} variant="body2" fontWeight={600}>
                    VAULT TOKENS
                  </Typography>
                  <CustomTooltip tooltipText={TOOLTIPS.vaultTokens} />
                </Box>
              </TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position, index) => {
              if (position.vaultBalance.vaultTokens !== 0) {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <TokenPairLogo
                          token1={position.lpToken.tokenA.name}
                          token2={position.lpToken.tokenB.name}
                        />
                        <Stack>
                          <Typography>
                            {`${position.lpToken.tokenA.name}/${position.lpToken.tokenB.name}`}
                          </Typography>
                        </Stack>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {formatUSD(position.lpBalance.usd)}
                      </Typography>
                      <Typography color="text.secondary">
                        {`${
                          formatTokenAmount(position.lpBalance.lpTokens) ?? "-"
                        } ${position.lpToken.name}`}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {formatTokenAmount(position.vaultBalance.vaultTokens)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <Button
                          disabled={!position}
                          onClick={() => onWithdraw(position)}
                        >
                          <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                          >
                            <Typography
                              color="primary"
                              sx={{ textTransform: "initial" }}
                            >
                              Unstake
                            </Typography>
                            <SwapHorizIcon />
                          </Stack>
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {showModal && selectedPosition && (
        <WithdrawConfirmationModal
          open={showModal}
          position={selectedPosition}
          onSuccess={() => {
            setShowModal(false);
            setShowSuccessModal(true);
          }}
          onClose={() => {
            setSelectedPosition(null);
            refetchPositions();
          }}
        />
      )}

      {showSuccessModal && selectedPosition && (
        <SuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          content={
            <Typography variant="body1">
              You’ve successfully unstaked {selectedPosition.lpToken.name} from
              the auto compounder.
            </Typography>
          }
        />
      )}
    </>
  );
};
