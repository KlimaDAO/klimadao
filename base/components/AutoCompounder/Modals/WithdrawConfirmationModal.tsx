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
import {
  useAccount,
  useBalance,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
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

  const { address: userAddress } = useAccount();

  // Use wagmi's useBalance hook for vault token balance
  const { data: vaultBalance, isLoading: isBalanceLoading } = useBalance({
    address: userAddress,
    token: position.vaultBalance.vaultAddress as `0x${string}`,
    watch: true,
  });

  // Memoize formatted balance
  const formattedBalance = useMemo(
    () => (vaultBalance ? vaultBalance.formatted : "0"),
    [vaultBalance]
  );

  // Parse amount to Wei using the token's decimals
  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount || "0", vaultBalance?.decimals ?? 18);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, vaultBalance?.decimals]);

  // Contract write hook
  const {
    write: withdraw,
    data: withdrawData,
    isLoading: isWithdrawLoading,
    reset: resetWithdraw,
  } = useContractWrite({
    address: position.vaultBalance.vaultAddress,
    abi: VAULT_ABI,
    functionName: "withdraw",
    args: [amountInWei],
    onError: (error) => {
      handleTransactionError(error, "pre");
    },
  });

  // Transaction status hook
  // TODO: Handle isTxn Success and failure.
  const { isLoading: isTransactionPending } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSuccess: () => onSuccess?.(),
    onError: (error) => handleTransactionError(error, "onChain"),
  });

  // Combined loading state
  const isLoading = isWithdrawLoading || isTransactionPending;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    // Prevent multiple decimal points
    if ((value.match(/\./g) || []).length > 1) return;

    // Check decimal places don't exceed token decimals
    const parts = value.split(".");
    if (parts[1] && parts[1].length > (vaultBalance?.decimals ?? 18)) return;

    setAmount(value);
    validateAmount(value);
  };

  const validateAmount = (value: string) => {
    if (value === "") {
      setError("");
      return;
    }

    const numAmount = Number(value);

    // Check for zero or very small values (effectively zero)
    if (numAmount <= 1e-18) {
      setError("Amount must be greater than 0");
      return;
    }

    if (isNaN(numAmount)) {
      setError("Please enter a valid number");
    } else if (numAmount <= 0) {
      setError("Amount must be greater than 0");
    } else if (numAmount > Number(formattedBalance)) {
      setError("Amount exceeds available balance");
    } else {
      setError("");
    }
  };

  const handleMaxClick = () => {
    setAmount(formattedBalance);
    setError("");
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

  const handleWithdraw = () => {
    const numAmount = Number(amount);

    // Additional validation before transaction
    if (numAmount <= 0 || numAmount <= 1e-18) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!withdraw) {
      toast.error("Unable to initiate unstaking. Please try again.");
      return;
    }

    withdraw();
  };

  // Handle modal close
  const handleClose = () => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    resetForm();
    onClose();
  };

  const isValidAmount = useMemo(() => {
    const numAmount = Number(amount);
    return numAmount > 0 && numAmount <= Number(formattedBalance) && !error;
  }, [amount, formattedBalance, error]);

  return (
    <BaseModal
      title="Unstake"
      open={open}
      onClose={handleClose}
      showCloseButton
      aria-labelledby="withdraw-modal"
      sx={{ "& > .MuiBox-root": { background: "#393939" } }}
    >
      <Box>
        <Stack spacing={2}>
          <Box>
            <InputLabel
              sx={{
                color: "text.primary",
                marginBottom: "8px",
                fontSize: "1.6rem",
                fontWeight: 500,
              }}
            >
              Amount to Unstake
            </InputLabel>
            <StyledInputWrapper>
              <CustomInputBase
                fullWidth
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.0"
                disabled={!Number(formattedBalance) || isLoading}
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
                      disabled={!Number(formattedBalance) || isLoading}
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
                fontSize="1.4rem"
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
            {isBalanceLoading ? (
              <CircularProgress size={16} sx={{ ml: 1 }} />
            ) : (
              `${formattedBalance} LP Available`
            )}
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
                      ? "CONFIRMING UNSTAKE..."
                      : "PREPARING..."}
                  </span>
                </Stack>
              ) : (
                "UNSTAKE"
              )}
            </ActionButton>
          </Stack>
        </Stack>
      </Box>
    </BaseModal>
  );
};
