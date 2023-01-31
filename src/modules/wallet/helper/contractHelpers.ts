import { ethers } from 'ethers';

import binanceRpcProvider from "../util/binanceRpcProvider";

const getContract = (binance_abi: any, address: any, signer: any) => {
  const signerOrProvider = signer ?? binanceRpcProvider;
  return new ethers.Contract(address, binance_abi, signerOrProvider);
};

export default getContract;