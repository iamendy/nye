import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { toronet } from "../constants/toronet";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [toronet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://testnet.toronet.org/rpc`,
      }),
    }),
    //publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Nye - Onchain verified NGOs",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
