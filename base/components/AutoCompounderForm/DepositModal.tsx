import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { parseUnits } from "ethers";
import { LiquidityPool } from "lib/types";
import React, { useMemo, useState } from "react";
import { Address } from "viem"; // Add this import if not already present
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  ActionButton,
  CloseButton,
  CustomBackdrop,
  HeaderTitle,
  InputField,
  ModalContent,
  ModalHeader,
  StepButton,
  StepContainer,
  StyledModal,
} from "./modalStyles";

// ABIs remain unchanged
const erc20ABI = [
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const vaultABI = [
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

interface DepositConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  amount: string;
  lpToken: LiquidityPool;
  onSuccess?: () => void;
  requiredConfirmations?: number;
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
  requiredConfirmations = 1,
}) => {
  const [transactionState, setTransactionState] =
    useState<TransactionState>("idle");
  const { address } = useAccount();

  // Convert amount to Wei
  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount, lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  // Check allowance
  const { data: allowance } = useContractRead({
    address: lpToken.poolAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address!, lpToken.vault],
    enabled: !!address && !!lpToken.vault,
    watch: true,
  });

  // Contract writes
  const { write: approve, data: approveData } = useContractWrite({
    address: lpToken.poolAddress,
    abi: erc20ABI,
    functionName: "approve",
  });

  const { write: deposit, data: depositData } = useContractWrite({
    address: lpToken.vault,
    abi: vaultABI,
    functionName: "deposit",
  });

  // Transaction tracking
  const {
    isLoading: isApproving,
    isSuccess: isApproveSuccess,
    status: approveStatus,
  } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const {
    isLoading: isDepositing,
    isSuccess: isDepositSuccess,
    status: depositStatus,
  } = useWaitForTransaction({
    hash: depositData?.hash,
  });

  // Derived state flags for UI control
  const isApprovalStage =
    transactionState === "idle" || transactionState === "approving";
  const isDepositStage =
    transactionState === "approved" || transactionState === "depositing";
  const canDeposit = transactionState === "approved";
  const showLoading =
    transactionState === "approving" || transactionState === "depositing";

  // Enhanced state management
  React.useEffect(() => {
    if (transactionState === "error") {
      return; // Don't update state if in error state
    }

    if (isApproving) {
      setTransactionState("approving");
    } else if (isApproveSuccess) {
      setTransactionState("approved");
    } else if (isDepositing) {
      setTransactionState("depositing");
    } else if (isDepositSuccess) {
      setTransactionState("success");
      onSuccess?.();
    }
  }, [
    isApproving,
    isApproveSuccess,
    isDepositing,
    isDepositSuccess,
    onSuccess,
    transactionState,
  ]);

  // Transaction handlers with error handling
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

  // Get transaction status message
  const getStatusMessage = () => {
    switch (transactionState) {
      case "approving":
        return `Approval transaction in progress (${approveStatus})`;
      case "approved":
        return "Ready to deposit";
      case "depositing":
        return `Deposit transaction in progress (${depositStatus})`;
      case "success":
        return "Transaction completed successfully";
      case "error":
        return "Transaction failed. Please try again.";
      default:
        return "Please approve the transaction";
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={transactionState === "idle" ? onClose : undefined}
      aria-labelledby="deposit-confirmation-modal"
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      slots={{ backdrop: CustomBackdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>Confirm Deposit</HeaderTitle>
          {transactionState === "idle" && (
            <CloseButton onClick={onClose} size="small">
              <CloseIcon />
            </CloseButton>
          )}
        </ModalHeader>

        <Box sx={{ p: "20px" }}>
          <Stack spacing={3}>
            <StepContainer>
              <StepButton
                $isActive={isApprovalStage}
                disabled={!isApprovalStage}
              >
                1. Approve
              </StepButton>
              <StepButton $isActive={isDepositStage} disabled={!canDeposit}>
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
              <ActionButton
                variant="primary"
                onClick={isApprovalStage ? handleApprove : handleDeposit}
                disabled={showLoading || (!isApprovalStage && !canDeposit)}
              >
                {showLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isApprovalStage ? (
                  "APPROVE"
                ) : (
                  "DEPOSIT"
                )}
              </ActionButton>

              <ActionButton
                variant="secondary"
                onClick={onClose}
                disabled={showLoading}
              >
                GO BACK
              </ActionButton>
            </Stack>
          </Stack>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default DepositConfirmationModal;
