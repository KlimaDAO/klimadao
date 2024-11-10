import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ERC20_ABI } from "abis/ERC20";
import { VAULT_ABI } from "abis/Vault";
import { parseUnits } from "ethers";
import { LiquidityPool } from "lib/types";
import React, { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import BaseModal from "./BaseModal";
import {
  ActionButton,
  CloseButton,
  HeaderTitle,
  InputField,
  InputLabel,
  ModalContent,
  ModalHeader,
  StepButton,
  StepContainer,
} from "./styles";

interface DepositConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  amount: string;
  lpToken: LiquidityPool;
  onSuccess?: () => void;
}

type TransactionState =
  | "idle"
  | "approving"
  | "approved"
  | "depositing"
  | "success"
  | "error";

const DepositConfirmationModal: React.FC<DepositConfirmationModalProps> = ({
  open,
  onClose,
  amount,
  lpToken,
  onSuccess,
}) => {
  const [transactionState, setTransactionState] =
    useState<TransactionState>("idle");
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);
  const { address } = useAccount();

  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount, lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  const { data: allowance = BigInt(0) } = useContractRead({
    address: lpToken.poolAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address!, lpToken.vault],
    enabled: !!address && !!lpToken.vault,
    watch: true,
  });

  const isApprovalNeeded = allowance < amountInWei;

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      if (!isApprovalNeeded) {
        setTransactionState("approved");
        setApprovalConfirmed(true);
      } else {
        setTransactionState("idle");
        setApprovalConfirmed(false);
      }
    } else {
      setTransactionState("idle");
      setApprovalConfirmed(false);
    }
  }, [open, isApprovalNeeded]);

  const { write: approve, data: approveData } = useContractWrite({
    address: lpToken.poolAddress,
    abi: ERC20_ABI,
    functionName: "approve",
  });

  const { write: deposit, data: depositData } = useContractWrite({
    address: lpToken.vault,
    abi: VAULT_ABI,
    functionName: "deposit",
  });

  const {
    isLoading: isApproving,
    isSuccess: isApproveSuccess,
    isError: isApproveError,
  } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 5, // Wait for at least 1 confirmation
  });

  const {
    isLoading: isDepositing,
    isSuccess: isDepositSuccess,
    isError: isDepositError,
  } = useWaitForTransaction({
    hash: depositData?.hash,
  });

  // Enhanced approval transaction tracking with confirmation
  useEffect(() => {
    if (isApproving) {
      setTransactionState("approving");
    } else if (isApproveSuccess) {
      setTransactionState("approved");
      setApprovalConfirmed(true);
    } else if (isApproveError) {
      setTransactionState("error");
      setApprovalConfirmed(false);
    }
  }, [isApproving, isApproveSuccess, isApproveError]);

  // Enhanced deposit transaction tracking
  useEffect(() => {
    if (isDepositing) {
      setTransactionState("depositing");
    } else if (isDepositSuccess) {
      setTransactionState("success");
      onSuccess?.();
    } else if (isDepositError) {
      setTransactionState("error");
    }
  }, [isDepositing, isDepositSuccess, isDepositError, onSuccess]);

  const handleApprove = async () => {
    try {
      if (!lpToken.vault || amountInWei === BigInt(0)) {
        throw new Error("Invalid vault address or amount");
      }
      approve?.({
        args: [lpToken.vault, amountInWei],
      });
    } catch (error) {
      console.error("Approval error:", error);
      setTransactionState("error");
    }
  };

  const handleDeposit = async () => {
    try {
      // Only allow deposit if approval is confirmed
      if (!approvalConfirmed || transactionState !== "approved") {
        console.warn("Cannot deposit: Approval not confirmed");
        return;
      }

      if (amountInWei === BigInt(0)) {
        throw new Error("Invalid amount");
      }

      deposit?.({
        args: [amountInWei],
      });
    } catch (error) {
      console.error("Deposit error:", error);
      setTransactionState("error");
    }
  };

  const truncateAddress = (address: Address): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusMessage = () => {
    switch (transactionState) {
      case "idle":
        return "Please approve the transaction";
      case "approving":
        return "Approval in progress... Waiting for confirmation";
      case "approved":
        return "Approval confirmed. Ready to deposit";
      case "depositing":
        return "Deposit in progress...";
      case "success":
        return "Transaction completed successfully";
      case "error":
        return "Transaction failed. Please try again.";
      default:
        return "Please approve the transaction";
    }
  };

  // Determine if user can interact with modal
  const canInteract = !isApproving && !isDepositing;

  // Determine step states with enhanced approval checking
  const isApproveStep =
    transactionState === "idle" || transactionState === "approving";
  const isDepositStep = transactionState === "approved" && approvalConfirmed;

  return (
    <BaseModal
      title="Auto Compounder"
      open={open}
      onClose={onClose}
      aria-labelledby="auto-compounder-deposit-modal"
    >
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>Confirm Deposit</HeaderTitle>
          {canInteract && (
            <CloseButton onClick={onClose} size="small">
              <CloseIcon />
            </CloseButton>
          )}
        </ModalHeader>

        <Box sx={{ p: "20px" }}>
          <Stack spacing={3}>
            <StepContainer>
              <StepButton
                $isActive={isApproveStep}
                disabled={!isApproveStep || !canInteract}
              >
                1. {approvalConfirmed ? "Approved" : "Approve"}
              </StepButton>
              <StepButton
                $isActive={isDepositStep}
                disabled={!isDepositStep || !canInteract}
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
              {getStatusMessage()}
            </Typography>

            <Stack spacing={2}>
              <Box>
                <InputLabel>Contract address</InputLabel>
                <InputField>{truncateAddress(lpToken.poolAddress)}</InputField>
              </Box>

              <Box>
                <InputLabel>Spender Address</InputLabel>
                <InputField>{truncateAddress(lpToken.vault)}</InputField>
              </Box>

              <Box>
                <InputLabel>Confirm quantity</InputLabel>
                <InputField>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    {amount}
                    <Typography color="text.secondary">
                      {lpToken.name}
                    </Typography>
                  </Stack>
                </InputField>
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              {isApproveStep && (
                <ActionButton
                  variant="primary"
                  onClick={handleApprove}
                  disabled={!canInteract}
                >
                  {isApproving ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "APPROVE"
                  )}
                </ActionButton>
              )}

              {isDepositStep && (
                <ActionButton
                  variant="primary"
                  onClick={handleDeposit}
                  disabled={!canInteract}
                >
                  {isDepositing ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "DEPOSIT"
                  )}
                </ActionButton>
              )}

              <ActionButton
                variant="secondary"
                onClick={onClose}
                disabled={!canInteract}
              >
                GO BACK
              </ActionButton>
            </Stack>
          </Stack>
        </Box>
      </ModalContent>
    </BaseModal>
  );
};

export default DepositConfirmationModal;
