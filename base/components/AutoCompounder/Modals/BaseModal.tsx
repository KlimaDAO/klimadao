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
  sx?: any;
  open: boolean;
  onClose: () => void;
  title: string | React.ReactElement;
  showCloseButton?: boolean;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

const ContentContainer = styled(Box)({
  padding: "20px",
});

const BaseModal: React.FC<BaseModalProps> = ({
  sx,
  open,
  onClose,
  title,
  children,
  showCloseButton = false,
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
      sx={{ ...sx }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContent>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>
          {showCloseButton && (
            <CloseButton onClick={onClose} size="small">
              <CloseIcon />
            </CloseButton>
          )}
        </ModalHeader>
        <ContentContainer>
          <Stack spacing={3}>{children}</Stack>
        </ContentContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default BaseModal;
