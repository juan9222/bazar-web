import { BscConnector } from "@binance-chain/bsc-connector";

const useWalletConnectionBSC = new BscConnector({
  supportedChainIds: [56, 97]
});

export default useWalletConnectionBSC;