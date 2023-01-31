import { ethers } from "ethers";
import BProductSale from "../abi/BProductSale.json";
import { getBNBAddress } from "./addressHelper";
import { BSC_TESTNET } from "./constantHelper";
import getContract from "./contractHelpers";

const getCreateSellOrderContract = (account: any, chainID = BSC_TESTNET) => {
  const provider = new ethers.providers.Web3Provider(window.BinanceChain);
  return getContract(BProductSale, getBNBAddress(chainID), provider.getSigner(account));
};

export default getCreateSellOrderContract;