import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";

export const StyledModal = styled(Modal)();

export const CustomBackdrop = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(0.4rem)",
  WebkitBackdropFilter: "blur(0.4rem)",
  zIndex: -1,
});

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "3.64rem",
  background: `${theme.palette.background.paper}`,
  borderRadius: "1.2rem",
  outline: "none",
  // Optional: add a subtle border to help with contrast against blur
  border: "0.1rem solid rgba(255, 255, 255, 0.08)",
}));

export const ModalHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem 2rem 0 2rem",
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "2.4rem",
  lineHeight: "2.8rem",
  color: theme.palette.text.primary,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  width: "3.2rem",
  height: "3.2rem",
  background: theme.palette.background.paper,
  borderRadius: "0.4rem",
  color: theme.palette.text.primary,
  "&:hover": {
    background: theme.palette.background.paper,
  },
}));

export const StepContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "0.4rem",
  width: "3.24rem",
  height: "4.9rem",
  background: theme.palette.background.paper,
  border: "0.1rem solid #303030",
  borderRadius: "0.8rem",
}));

export const StepButton = styled(Button)<{ $isActive?: boolean }>(
  ({ $isActive, theme }) => ({
    width: "1.58rem",
    cursor: "unset",
    height: "4.1rem",
    background: $isActive ? "#00CC33" : "transparent",
    borderRadius: "0.4rem",
    padding: "1.2rem 0",
    color: $isActive ? "#FFFFFF" : "#9C9C9C",
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.4rem",
    lineHeight: "1.7rem",
    textTransform: "none",
    userSelect: "none",
    boxShadow: $isActive ? "0 0.4rem 2.4rem rgba(0, 0, 0, 0.12)" : "none",
    "&:hover": {
      background: $isActive ? "#00CC33" : "transparent",
    },
    "&.Mui-disabled": {
      color: "#FFFFFF", // Changed this to keep white color when disabled
    },
  })
);

export const InputLabel = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "1.6rem",
  lineHeight: "2rem",
  letterSpacing: "0.01em",
  color: theme.palette.text.primary,
}));

export const InputField = styled(Box)(({ theme }) => ({
  width: "3.24rem",
  height: "4.4rem",
  padding: "1.2rem",
  borderRadius: "0.8rem",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

interface ActionButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "primary" | "secondary";
}

const ActionButtonBase = (props: ActionButtonProps) => {
  const { variant: _variant, ...other } = props;
  return <Button {...other} />;
};

export const ActionButton = styled(ActionButtonBase)(
  ({ variant = "primary", theme }) => ({
    width: "3.24rem",
    height: "4.8rem",
    background: variant === "primary" ? theme.palette.primary.main : "#FFFFFF",
    color: "#313131",
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    letterSpacing: "0.06rem",
    textTransform: "uppercase",
    borderRadius: "0.4rem",
    ...(variant === "secondary" && {
      border: "0.1rem solid #626266",
      boxShadow: "0 0.4rem 2.8rem rgba(0, 0, 0, 0.06)",
    }),
    "&:hover": {
      background:
        variant === "primary" ? theme.palette.primary.main : "#FFFFFF",
    },
    "&.Mui-disabled": {
      background: "rgba(255, 255, 255, 0.12)",
      color: "rgba(255, 255, 255, 0.3)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  })
);
