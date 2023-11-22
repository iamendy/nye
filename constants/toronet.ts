import { Chain } from "@wagmi/core";

export const toronet = {
  id: 54321,
  name: "Toronet Testnet",
  network: "toronet",
  nativeCurrency: {
    decimals: 18,
    name: "Toro",
    symbol: "TORO",
  },
  rpcUrls: {
    public: { http: ["https://testnet.toronet.org/rpc"] },
    default: { http: ["https://testnet.toronet.org/rpc"] },
  },
  blockExplorers: {
    etherscan: { name: "expolorer", url: "https://testnet.toronet.org/" },
    default: { name: "expolorer", url: "https://testnet.toronet.org/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
