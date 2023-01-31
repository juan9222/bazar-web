import { ethers } from "ethers";
import getNodeUrl from "./getNodeUrl";

const RPC_BINANCE = getNodeUrl();

const binanceRpcProvider = new ethers.providers.JsonRpcProvider(RPC_BINANCE);

export default binanceRpcProvider;