import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, styled } from "@mui/material";
import React from "react";
import {
  CloseButton,
  CustomBackdrop,
  HeaderTitle,
  ModalContent,
  ModalHeader,
  StyledModal,
} from "./styles";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

const ContentContainer = styled(Box)({
  padding: "20px",
});

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  "aria-labelledby": ariaLabelledBy,
}) => {
  const handleModalClose = (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      return;
    }

    onClose();
  };
  return (
    <StyledModal
      open={open}
      onClose={handleModalClose}
      aria-labelledby={ariaLabelledBy || "modal-title"}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableEscapeKeyDown
      slots={{ backdrop: CustomBackdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>
          <CloseButton onClick={onClose} size="small">
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <ContentContainer>
          <Stack spacing={3}>{children}</Stack>
        </ContentContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default BaseModal;
