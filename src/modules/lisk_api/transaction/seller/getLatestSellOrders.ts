import { getClient } from "../../util/getClient";

const getLatestSellOrders = async () => {
  const client = await getClient();
  return client.invoke('seller:getLatestOrder') as [];
};

export default getLatestSellOrders;