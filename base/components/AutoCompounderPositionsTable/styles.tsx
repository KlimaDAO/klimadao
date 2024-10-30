import { Box, styled } from "@mui/material";

export const MobilePositionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
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

export const DataPairContainer = styled(Box)<{ hasBorder?: boolean }>(
  ({ theme, hasBorder }) => ({
    width: "162px",
    display: "flex",
    flexDirection: "column",
    padding: "8px 12px",
    borderRight: hasBorder ? `1px solid ${theme.palette.divider}` : "none",
  })
);

export const WithdrawButton = styled(Box)(({ theme }) => ({
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
