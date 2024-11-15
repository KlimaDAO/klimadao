import {
  alpha,
  Box,
  Button,
  InputBase,
  Paper,
  Select,
  styled,
} from "@mui/material";

// Custom styled components
export const StyledPaper = styled(Paper)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",

  padding: "20px",
  position: "relative",
  width: "420px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "20px 16px",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.8rem",
  height: "48px",
  "& .MuiSelect-select": {
    padding: "12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
}));

export const MaxButtonContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "1px",
  top: "1px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.8rem",
}));

export const MaxButton = styled(Button)(({ theme }) => ({
  height: "100%",
  borderRadius: "0.4rem",
  borderTopRightRadius: "0.8rem",
  borderBottomRightRadius: "0.8rem",
  padding: "0 16px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: "1.4rem",
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
  },
}));

interface StyledInputWrapperProps {
  error?: boolean;
}
export const StyledInputWrapper = styled("div")<StyledInputWrapperProps>(
  ({ theme }) => ({
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    height: "4.8rem",
    borderRadius: "0.8rem",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  })
);

export const CustomInputBase = styled(InputBase)(() => ({
  height: "100%",
  "& .MuiInputBase-input": {
    height: "100%",
    padding: "0 1.6rem",
    fontSize: "1.6rem",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
  },
  "& .MuiInputAdornment-root": {
    height: "100%",
    maxHeight: "100%",
    margin: 0,
  },
}));
