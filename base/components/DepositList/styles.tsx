import { Box, styled } from "@mui/material";

export const MobileItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px 0px",
  justifyContent: "center",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: "100%",
}));

export const TopRowContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "324px",
  marginBottom: "12px",
});

export const DataPairContainer = styled(Box)({
  width: "162px",
  display: "flex",
  flexDirection: "column",
  padding: "8px 12px",
});

export const DepositButton = styled(Box)(({ theme }) => ({
  width: "324px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "12px",
}));
