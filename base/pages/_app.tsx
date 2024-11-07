import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { supportedChains } from "lib/constants";
import { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// organize-imports-ignore
import "../styles/normalize.css";
// organize-imports-ignore
import "../styles/variables.css";
// organize-imports-ignore
import {
  QueryClientProvider,
  QueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import { AppTheme } from "lib/theme";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const { chains, publicClient } = configureChains(
  [...supportedChains],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "KlimaDAO Base",
  projectId: "d70d1ad9ea2bed68ed81737f44a75ef0", // change this...
  chains,
});

const connectors = connectorsForWallets([...wallets]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

export default function App({ Component, pageProps }: AppProps) {
  const [reactQueryClient] = useState(() => new ReactQueryClient());

  return (
    <ThemeProvider theme={AppTheme}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <StyledEngineProvider injectFirst>
            <QueryClientProvider client={reactQueryClient}>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                theme="dark" // or "light" based on your preference
                pauseOnFocusLoss={false}
                pauseOnHover={false}
              />
            </QueryClientProvider>
          </StyledEngineProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
