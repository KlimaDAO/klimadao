import {
  Box,
  Button,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";

export const StyledModal = styled(Modal)({
  //   [`& .MuiModal-backdrop, & .MuiBackdrop-root`]: {
  //     backgroundColor: "rgba(0, 0, 0, 0.2) !important",
  //     backdropFilter: "blur(8px) !important",
  //     WebkitBackdropFilter: "blur(8px) !important",
  //   },
});

export const CustomBackdrop = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: -1,
});

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "364px",
  background: `${theme.palette.background.paper}`,
  borderRadius: "12px",
  outline: "none",
  // Optional: add a subtle border to help with contrast against blur
  border: "1px solid rgba(255, 255, 255, 0.08)",
}));

export const ModalHeader = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 20px 0 20px",
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "24px",
  lineHeight: "28px",
  color: theme.palette.text.primary,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  width: "32px",
  height: "32px",
  background: theme.palette.background.paper,
  borderRadius: "4px",
  color: theme.palette.text.primary,
  "&:hover": {
    background: theme.palette.background.paper,
  },
}));

export const StepContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "4px",
  width: "324px",
  height: "49px",
  background: theme.palette.background.paper,
  border: "1px solid #303030",
  borderRadius: "8px",
}));

export const StepButton = styled(Button)<{ $isActive?: boolean }>(
  ({ $isActive, theme }) => ({
    width: "158px",
    height: "41px",
    background: $isActive ? "#00CC33" : "transparent", // Changed back to original
    borderRadius: "4px",
    padding: "12px 0px",
    color: $isActive ? "#FFFFFF" : "#9C9C9C", // Changed back to original
    fontFamily: theme.typography.fontFamily, // Keep theme font
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "17px",
    textTransform: "none",
    boxShadow: $isActive ? "0px 4px 24px rgba(0, 0, 0, 0.12)" : "none",
    "&:hover": {
      background: $isActive ? "#00CC33" : "transparent", // Changed back to original
    },
    "&.Mui-disabled": {
      color: "#9C9C9C", // Changed back to original
    },
  })
);
export const InputLabel = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "20px",
  letterSpacing: "0.01em",
  color: theme.palette.text.primary,
}));

export const InputField = styled(Box)(({ theme }) => ({
  width: "324px",
  height: "44px",
  padding: "12px",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: "primary" | "secondary" }>(({ variant = "primary", theme }) => ({
  width: "324px",
  height: "48px",
  background: variant === "primary" ? theme.palette.primary.main : "#FFFFFF",
  color: variant === "primary" ? theme.palette.text.primary : "#313131",
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "16px",
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  borderRadius: "4px",
  ...(variant === "secondary" && {
    border: "1px solid #626266",
    boxShadow: "0px 4px 28px rgba(0, 0, 0, 0.06)",
  }),
  "&:hover": {
    background:
      variant === "primary" ? theme.palette.text.secondary : "#FFFFFF",
  },
  "&.Mui-disabled": {
    background: "rgba(255, 255, 255, 0.12)",
    color: "rgba(255, 255, 255, 0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
