import { Box, CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AutoCompounderDefaultPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auto-compounder/deposit/all");
  }, [router]); // Added router to dependency array

  // Return a loading state while redirecting
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AutoCompounderDefaultPage;
