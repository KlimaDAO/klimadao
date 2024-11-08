import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ERC20_ABI } from "abis/ERC20";
import { VAULT_ABI } from "abis/Vault";
import { parseUnits } from "ethers";
import { LiquidityPool } from "lib/types";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import BaseModal from "./BaseModal";
import { ActionButton, InputField, StepButton, StepContainer } from "./styles";

interface DepositConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  amount: string;
  lpToken: LiquidityPool;
  onSuccess?: () => void;
}

const DepositConfirmationModal: React.FC<DepositConfirmationModalProps> = ({
  open,
  onClose,
  amount,
  lpToken,
  onSuccess,
}) => {
  const [transactionToastId, setTransactionToastId] =
    useState<React.ReactText | null>(null);
  const { address } = useAccount();

  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount, lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  // Read allowance
  const { data: allowance } = useContractRead({
    address: lpToken.poolAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address!, lpToken.vault],
    enabled: !!address && !!lpToken.vault,
    watch: true,
  });

  // Approve transaction
  const {
    write: approve,
    data: approveData,
    isLoading: isApproveLoading,
    reset: resetApprove,
  } = useContractWrite({
    address: lpToken.poolAddress,
    abi: ERC20_ABI,
    functionName: "approve",
    onError: (error) => handleTransactionError(error, "approve", "pre"),
  });

  // Watch approve transaction
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransaction({
      hash: approveData?.hash,
      confirmations: 2
      onSuccess: () => {
        handleApproveSuccess();
      },
      onError: (error) => handleTransactionError(error, "approve", "onChain"),
    });

  // Deposit transaction
  const {
    write: deposit,
    data: depositData,
    isLoading: isDepositLoading,
    reset: resetDeposit,
  } = useContractWrite({
    address: lpToken.vault,
    abi: VAULT_ABI,
    functionName: "deposit",
    onError: (error) => handleTransactionError(error, "deposit", "pre"),
  });

  // Watch deposit transaction
  const {
    isLoading: isDepositConfirming,
    isSuccess: isDepositSuccess,
    error: depositError,
  } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess: () => {
      handleDepositSuccess();
    },
    onError: (error) => handleTransactionError(error, "deposit", "onChain"),
  });

  const needsApproval = allowance ? allowance < amountInWei : true;
  const isLoading =
    isApproveLoading ||
    isApproveConfirming ||
    isDepositLoading ||
    isDepositConfirming;

  const handleApprove = async () => {
    if (!approve) {
      toast.error("Unable to initiate approval. Please try again.");
      return;
    }
    const id = toast.info("Please confirm the approval in your wallet", {
      autoClose: false,
    });
    setTransactionToastId(id);
    approve({
      args: [lpToken.vault, amountInWei],
    });
  };

  const handleDeposit = async () => {
    if (!deposit) {
      toast.error("Unable to initiate deposit. Please try again.");
      return;
    }
    const id = toast.info("Please confirm the deposit in your wallet", {
      autoClose: false,
    });
    setTransactionToastId(id);
    deposit({
      args: [amountInWei],
    });
  };

  const handleApproveSuccess = () => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    toast.success(
      <Stack spacing={1}>
        <Typography variant="body1">Approval successful!</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          Transaction: {approveData?.hash}
        </Typography>
      </Stack>
    );
  };

  const handleDepositSuccess = () => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    toast.success(
      <Stack spacing={1}>
        <Typography variant="body1">Deposit successful!</Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          Transaction: {depositData?.hash}
        </Typography>
      </Stack>
    );
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1500);
  };

  const handleTransactionError = (
    error: Error,
    type: "approve" | "deposit",
    stage: "pre" | "onChain"
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
    } else {
      userFriendlyMessage = errorMessage;
    }

    toast.error(
      <Stack spacing={1}>
        <Typography variant="body1">
          {`${type === "approve" ? "Approval" : "Deposit"} ${
            stage === "pre" ? "Error" : "Failed"
          }`}
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

  const formatErrorMessage = (message: string): string => {
    return message
      .replace(/^Error: /i, "")
      .replace(/\(action=.*\)/, "")
      .replace(/\(code=.*\)/, "")
      .trim();
  };

  const handleClose = () => {
    if (transactionToastId) {
      toast.dismiss(transactionToastId);
      setTransactionToastId(null);
    }
    resetApprove?.();
    resetDeposit?.();
    onClose();
  };

  const truncateAddress = (address: Address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Confirm Deposit"
      aria-labelledby="deposit-confirmation-modal"
    >
      <StepContainer>
        <StepButton
          $isActive={needsApproval && !isApproveSuccess}
          disabled={!needsApproval || isApproveSuccess}
        >
          1. Approve
        </StepButton>
        <StepButton
          $isActive={!needsApproval || isApproveSuccess}
          disabled={needsApproval && !isApproveSuccess}
        >
          2. Submit
        </StepButton>
      </StepContainer>

      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "16px",
          color: "#FFFFFF",
          letterSpacing: "0.01em",
        }}
      >
        {needsApproval && !isApproveSuccess
          ? "Please approve the transaction"
          : "Please confirm your deposit"}
      </Typography>

      <Stack spacing={2}>
        <Box>
          <InputLabel>LP Address</InputLabel>
          <InputField>
            <Stack
              gap={0.5}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {truncateAddress(lpToken.poolAddress)}
              <Tooltip
                title={<Typography>{lpToken.poolAddress}</Typography>}
                placement="top"
              >
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <RemoveRedEye fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </InputField>
        </Box>

        <Box>
          <InputLabel>Spender Address</InputLabel>
          <InputField>
            <Stack
              gap={0.5}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {truncateAddress(lpToken.vault)}
              <Tooltip
                title={<Typography>{lpToken.vault}</Typography>}
                placement="top"
              >
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <RemoveRedEye fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </InputField>
        </Box>

        <Box>
          <InputLabel>Confirm quantity</InputLabel>
          <InputField>
            <Stack direction="row" alignItems="flex-end" gap={1}>
              {amount}
              <Typography color="text.secondary">{lpToken.name}</Typography>
            </Stack>
          </InputField>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <ActionButton
          variant="primary"
          onClick={needsApproval ? handleApprove : handleDeposit}
          disabled={
            isLoading || // Disable during any loading state
            (!needsApproval && !isApproveSuccess) || // Disable submit if approval not complete
            (needsApproval && isApproveSuccess) // Disable approve if already approved
          }
        >
          {isLoading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={20} color="inherit" />
              <span>
                {isApproveConfirming
                  ? "CONFIRMING APPROVAL..."
                  : isDepositConfirming
                  ? "CONFIRMING DEPOSIT..."
                  : "PREPARING..."}
              </span>
            </Stack>
          ) : needsApproval ? (
            "APPROVE"
          ) : (
            "DEPOSIT"
          )}
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={handleClose}
          disabled={isApproveConfirming || isDepositConfirming}
        >
          GO BACK
        </ActionButton>
      </Stack>
    </BaseModal>
  );
};

export default DepositConfirmationModal;
