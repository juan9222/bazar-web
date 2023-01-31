import addresses from "./constantHelper";

export const getBNBAddress = (chainId: number) => {
  return addresses.binance[chainId];
};