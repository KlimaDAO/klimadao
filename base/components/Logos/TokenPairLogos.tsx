import { Box } from "@mui/material";

// TODO : Make strict types
interface TokenPairLogoProps {
  token1: string;
  token2: string;
}

export const TokenPairLogo = ({ token1, token2 }: TokenPairLogoProps) => {
  return (
    <Box sx={{ position: "relative", width: "40px", height: "24px" }}>
      <Box
        component="img"
        src={`/tokens/${token1.toLowerCase()}.svg`}
        alt={token1}
        sx={{
          position: "absolute",
          left: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
        }}
      />
      <Box
        component="img"
        src={`/tokens/${token2.toLowerCase()}.svg`}
        alt={token2}
        sx={{
          position: "absolute",
          right: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};
