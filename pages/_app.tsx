import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { toronet } from "../constants/toronet";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/layouts/Layout";
import OrgLayout from "../components/layouts/OrgLayout";
import DonorLayout from "../components/layouts/DonorLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const queryClient = new QueryClient();

export const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["400", "500", "700"],
});

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
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => setIsLoaded(true), []);

  return (
    <>
      {isLoaded && (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <QueryClientProvider client={queryClient}>
              <main className={`${inter.className}`}>
                <Layout>
                  {router?.pathname?.includes("organization") ? (
                    <OrgLayout>
                      <Component {...pageProps} />
                    </OrgLayout>
                  ) : router?.pathname?.includes("donor") ? (
                    <DonorLayout>
                      <Component {...pageProps} />
                    </DonorLayout>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Layout>
              </main>
            </QueryClientProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}

export default MyApp;
