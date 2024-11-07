import {
  Box,
  CircularProgress,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { VAULT_ABI } from "abis/Vault";
import { parseUnits } from "ethers";
import { Position } from "lib/types";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useContractWrite, useWaitForTransaction } from "wagmi";
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

export const WithdrawConfirmationModal: React.FC<WithdrawModalProps> = ({
  open,
  onClose,
  onSuccess,
  position,
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [transactionToastId, setTransactionToastId] =
    useState<React.ReactText | null>(null);

  const availableLP = position.vaultBalance.vaultTokens;
  const lpToken = position.lpToken;

  // Parse amount to Wei
  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount || "0", lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  // Contract write hook
  const {
    write: withdraw,
    data: withdrawData,
    isLoading: isWithdrawLoading,
    reset: resetWithdraw,
    error: withdrawError,
  } = useContractWrite({
    address: position.vaultBalance.vaultAddress,
    abi: VAULT_ABI,
    functionName: "withdraw",
    args: [amountInWei],
    onError: (error) => {
      // Handle pre-transaction errors (e.g., user rejects transaction)
      handleTransactionError(error, "pre");
    },
  });

  // Transaction status hook
  const {
    isLoading: isTransactionPending,
    isSuccess: isTransactionSuccess,
    error: transactionError,
  } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSuccess: () => {
      handleTransactionSuccess();
    },
    onError: (error) => {
      // Handle on-chain transaction errors
      handleTransactionError(error, "onChain");
    },
  });

  // Combined loading state
  const isLoading = isWithdrawLoading || isTransactionPending;

  // Handle transaction success
  const handleTransactionSuccess = () => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    toast.success(
      <Stack spacing={1}>
        <Typography variant="body1">Withdrawal successful!</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          Transaction: {withdrawData?.hash}
        </Typography>
      </Stack>
    );
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1500);
  };

  // Handle transaction errors
  const handleTransactionError = (
    error: Error,
    errorType: "pre" | "onChain"
  ) => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }

    const errorMessage = formatErrorMessage(
      error?.message || "Transaction failed"
    );
    let userFriendlyMessage = "";

    if (isUserRejection(errorMessage)) {
      userFriendlyMessage = "Transaction rejected by user.";
    } else if (isInsufficientFunds(errorMessage)) {
      userFriendlyMessage = "Insufficient funds to complete the transaction.";
    } else if (isSlippageError(errorMessage)) {
      userFriendlyMessage =
        "Transaction failed due to slippage or price impact.";
    } else {
      userFriendlyMessage = errorMessage;
    }

    toast.error(
      <Stack spacing={1}>
        <Typography variant="body1">
          {errorType === "pre" ? "Transaction Error" : "Transaction Failed"}
        </Typography>
        <Typography variant="body2" color="error">
          {userFriendlyMessage}
        </Typography>
      </Stack>
    );
  };

  // Helper functions for error handling
  const isUserRejection = (message: string): boolean => {
    const rejectionPhrases = [
      "user rejected",
      "user denied",
      "denied transaction",
      "rejected by user",
    ];
    return rejectionPhrases.some((phrase) =>
      message.toLowerCase().includes(phrase)
    );
  };

  const isInsufficientFunds = (message: string): boolean => {
    return message.toLowerCase().includes("insufficient funds");
  };

  const isSlippageError = (message: string): boolean => {
    return (
      message.toLowerCase().includes("slippage") ||
      message.toLowerCase().includes("price impact")
    );
  };

  const formatErrorMessage = (message: string): string => {
    // Remove common Web3 error prefixes and technical details
    return message
      .replace(/^Error: /i, "")
      .replace(/\(action=.*\)/, "")
      .replace(/\(code=.*\)/, "")
      .trim();
  };

  // Reset form state
  const resetForm = () => {
    setAmount("");
    setError("");
    resetWithdraw?.();
  };

  const handleMaxClick = () => {
    setAmount(availableLP.toString());
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setAmount(value);
    validateAmount(value);
  };

  const validateAmount = (value: string) => {
    if (value === "") {
      setError("");
      return;
    }

    const numAmount = parseFloat(value);
    if (isNaN(numAmount)) {
      setError("Please enter a valid number");
    } else if (numAmount <= 0) {
      setError("Amount must be greater than 0");
    } else if (numAmount > availableLP) {
      setError("Amount exceeds available LP tokens");
    } else {
      setError("");
    }
  };

  const handleWithdraw = () => {
    if (!withdraw) {
      toast.error("Unable to initiate withdrawal. Please try again.");
      return;
    }
    const id = toast.info("Please confirm the transaction in your wallet", {
      autoClose: false,
    });
    setTransactionToastId(id);
    withdraw();
  };

  // Allow modal to be closed at any time
  const handleClose = () => {
    // Dismiss any pending transaction toast
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    resetForm();
    onClose();
  };

  const isValidAmount = useMemo(() => {
    const numAmount = parseFloat(amount);
    return numAmount > 0 && numAmount <= availableLP && !error;
  }, [amount, availableLP, error]);

  return (
    <BaseModal
      title="Withdraw"
      open={open}
      onClose={handleClose}
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
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.0"
                disabled={!!!availableLP || isLoading}
                error={!!error}
                inputProps={{
                  inputMode: "decimal",
                  pattern: "[0-9]*",
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
                      disabled={!!!availableLP || isLoading}
                    >
                      MAX
                    </MaxButton>
                  </InputAdornment>
                }
              />
            </StyledInputWrapper>
            {error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: "block" }}
              >
                {error}
              </Typography>
            )}
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
              disabled={!isValidAmount || isLoading || !withdraw}
            >
              {isLoading ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={20} color="inherit" />
                  <span>
                    {isTransactionPending
                      ? "CONFIRMING WITHDRAWAL..."
                      : "PREPARING..."}
                  </span>
                </Stack>
              ) : (
                "WITHDRAW"
              )}
            </ActionButton>

            <ActionButton
              variant="secondary"
              onClick={handleClose}
              disabled={isTransactionPending}
              // Removed 'disabled' prop to allow closing the modal anytime
            >
              GO BACK
            </ActionButton>
          </Stack>
        </Stack>
      </Box>
    </BaseModal>
  );
};
