import { getClient } from "../../util/getClient";

const getLatestBuyerOrders = async () => {
  const client = await getClient();
  return client.invoke('buyer:getLatestOrder') as [];
};

export default getLatestBuyerOrders;