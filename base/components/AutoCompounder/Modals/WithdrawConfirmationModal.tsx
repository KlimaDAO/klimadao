import {
  Box,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { parseUnits } from "ethers";
import { Position } from "lib/types";
import React, { useMemo, useState } from "react";
import {
  CustomInputBase,
  MaxButton,
  StyledInputWrapper,
} from "../Forms/styles";
import BaseModal from "./BaseModal";
import { ActionButton } from "./styles";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  position: Position;
}

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  position: Position;
}
export const WithdrawConfirmationModal: React.FC<WithdrawModalProps> = ({
  open,
  onClose,
  onSuccess,
  position,
}) => {
  const [amount, setAmount] = useState("");
  const availableLP = position.balance.lpTokens;
  const lpToken = position.lpToken;

  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount || "0", lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  const handleMaxClick = () => {
    setAmount(availableLP.toString());
  };

  const handleWithdraw = async () => {
    try {
      console.log("Withdrawing:", amountInWei.toString());
      onSuccess?.();
    } catch (error) {
      console.error("Withdrawal error:", error);
    }
  };

  const isValidAmount = useMemo(() => {
    const numAmount = parseFloat(amount);
    return numAmount > 0 && numAmount <= availableLP;
  }, [amount, availableLP]);

  return (
    <BaseModal
      title="Withdraw"
      open={open}
      onClose={onClose}
      aria-labelledby="withdraw-modal"
    >
      <Box>
        <Stack spacing={2}>
          <Box>
            <InputLabel
              sx={{
                color: "text.secondary",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Amount to Withdraw
            </InputLabel>
            <StyledInputWrapper>
              <CustomInputBase
                fullWidth
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                inputProps={{
                  min: 0,
                  max: availableLP,
                  step: "any",
                }}
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
                      disabled={availableLP === "0"}
                    >
                      MAX
                    </MaxButton>
                  </InputAdornment>
                }
              />
            </StyledInputWrapper>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "14px" }}
          >
            {availableLP} LP Available
          </Typography>

          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <ActionButton
              variant="primary"
              onClick={handleWithdraw}
              disabled={!isValidAmount}
            >
              WITHDRAW
            </ActionButton>

            <ActionButton variant="secondary" onClick={onClose}>
              GO BACK
            </ActionButton>
          </Stack>
        </Stack>
      </Box>
    </BaseModal>
  );
};
