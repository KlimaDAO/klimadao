import { StyledEngineProvider } from "@mui/material/styles";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { baseSepolia, optimismGoerli, sepolia } from "wagmi/chains";
// organize-imports-ignore
import "@klimadao/lib/theme/normalize.css";
// organize-imports-ignore
import "@klimadao/lib/theme/variables.css";
// organize-imports-ignore
import "@klimadao/carbonmark/theme/variables.css"; // overrides for variables.css - must be imported after
// organize-imports-ignore
import "@klimadao/lib/theme/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import "../styles/globals.css";

const config = getDefaultConfig({
  appName: "Cross-Chain Klima",
  projectId: "d70d1ad9ea2bed68ed81737f44a75ef0", // todo - replace this
  chains: [sepolia, baseSepolia, optimismGoerli],
  ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            fontStack: "system",
            accentColor: "#0c3",
            borderRadius: "small",
            accentColorForeground: "#000",
          })}
        >
          <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
          </StyledEngineProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
