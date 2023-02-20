import { apiClient } from "@liskhq/lisk-client";

let clientCache: any;
const bazarNodeAPI = `wss://${ process.env.REACT_APP_BAZAR_TESTNET_SERVICES }/ws`;

export const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(bazarNodeAPI);
  }
  return clientCache;
};
