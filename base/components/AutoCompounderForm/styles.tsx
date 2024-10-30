import { Box, Button, Paper, Select, styled } from "@mui/material";

// Custom styled components
export const StyledPaper = styled(Paper)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  overflow: "hidden",
  padding: "20px 20px 40px",
  position: "relative",
  width: "364px",
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  height: "48px",
  "& .MuiSelect-select": {
    padding: "12px",
  },
}));

export const MaxButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: "1px",
  top: "1px",
  height: "46px",
  width: "60px",
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "12px",
}));

export const StyledInputWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "8px",
  height: "48px",
  position: "relative",
  width: "320px",
}));
