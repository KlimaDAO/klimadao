import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { parseUnits } from "ethers";
import React, { useMemo, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { LiquidityPool } from ".";
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

// ABIs
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

  const { address } = useAccount();

  const amountInWei = useMemo(() => {
    try {
      return parseUnits(amount, lpToken.decimals);
    } catch (e) {
      console.error("Error parsing amount:", e);
      return BigInt(0);
    }
  }, [amount, lpToken.decimals]);

  const { data: allowance } = useContractRead({
    address: lpToken.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address!, lpToken.vault!],
    enabled: !!address && !!lpToken.vault,
    watch: true,
  });

  const { write: approve, data: approveData } = useContractWrite({
    address: lpToken.address,
    abi: erc20ABI,
    functionName: "approve",
  });

  const { isLoading: isApproving, isSuccess: isApproveSuccess } =
    useWaitForTransaction({
      hash: approveData?.hash,
    });

  const { write: deposit, data: depositData } = useContractWrite({
    address: lpToken.vault!,
    abi: vaultABI,
    functionName: "deposit",
  });

  const { isLoading: isDepositing, isSuccess: isDepositSuccess } =
    useWaitForTransaction({
      hash: depositData?.hash,
    });

  const needsApproval = allowance ? allowance < amountInWei : true;

  React.useEffect(() => {
    if (isApproving) setTransactionState("approving");
    if (isApproveSuccess) setTransactionState("approved");
    if (isDepositing) setTransactionState("depositing");
    if (isDepositSuccess) {
      setTransactionState("success");
      onSuccess?.();
    }
  }, [
    isApproving,
    isApproveSuccess,
    isDepositing,
    isDepositSuccess,
    onSuccess,
  ]);

  const handleApprove = async () => {
    try {
      approve?.({
        args: [lpToken.vault!, amountInWei],
      });
    } catch (error) {
      console.error("Approval error:", error);
      setTransactionState("error");
    }
  };

  const handleDeposit = async () => {
    try {
      deposit?.({
        args: [amountInWei],
      });
    } catch (error) {
      console.error("Deposit error:", error);
      setTransactionState("error");
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
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
          <CloseButton onClick={onClose} size="small">
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <Box sx={{ p: "20px" }}>
          <Stack spacing={3}>
            <StepContainer>
              <StepButton
                $isActive={!isApproveSuccess}
                disabled={isApproveSuccess}
              >
                1. Approve
              </StepButton>
              <StepButton
                $isActive={isApproveSuccess}
                disabled={!isApproveSuccess}
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
              Please approve the transaction.
            </Typography>

            <Stack spacing={2}>
              <Box>
                <InputLabel>Contact address</InputLabel>
                <InputField>{truncateAddress(lpToken.address)}</InputField>
              </Box>

              <Box>
                <InputLabel>Spender Address</InputLabel>
                <InputField>{truncateAddress(lpToken.vault)}</InputField>
              </Box>

              <Box>
                <InputLabel>Confirm quantity</InputLabel>
                <InputField>
                  <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
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
                onClick={needsApproval ? handleApprove : handleDeposit}
                disabled={isApproving || isDepositing}
              >
                {isApproving || isDepositing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : needsApproval ? (
                  "APPROVE"
                ) : (
                  "DEPOSIT"
                )}
              </ActionButton>

              <ActionButton variant="secondary" onClick={onClose}>
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
