import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import BaseModal from "./BaseModal";
import { ActionButton } from "./styles";

interface StakeConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const SuccessModal: React.FC<StakeConfirmationModalProps> = ({
  open,
  onClose,
  content,
}) => {
  const router = useRouter();
  return (
    <BaseModal
      title={
        <Box display="flex" alignItems="center" gap="0.8rem">
          <CheckCircleOutlineOutlined fontSize="large" htmlColor="#00CC33" />
          <span>Success!</span>
        </Box>
      }
      open={open}
      onClose={onClose}
      aria-labelledby="auto-compounder-success-modal"
    >
      {content}
      <Stack spacing={1.5}>
        <ActionButton
          variant="primary"
          onClick={() => {
            router.push("/auto-compounder/positions");
            onClose();
          }}
        >
          View Positions
        </ActionButton>
        <ActionButton
          variant="secondary"
          onClick={() => {
            router.push("/auto-compounder/stake/all");
            onClose();
          }}
        >
          Stake More
        </ActionButton>
      </Stack>
    </BaseModal>
  );
};

export default SuccessModal;
