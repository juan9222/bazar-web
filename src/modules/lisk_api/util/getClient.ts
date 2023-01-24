import { apiClient } from "@liskhq/lisk-client";

let clientCache: any;
const bazarNodeAPI = 'ws://localhost:8080/ws';

export const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(bazarNodeAPI);
  }
  return clientCache;
};
