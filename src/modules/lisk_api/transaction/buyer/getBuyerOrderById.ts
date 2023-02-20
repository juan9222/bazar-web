import { BuyerOrderType } from "../../types/buyerOrderType";
import { getClient } from "../../util/getClient";

const getOrderById = async (orderId?: string) => {
  const client = await getClient();
  return client.invoke("buyer:getOrder", {
    id: orderId
  }) as BuyerOrderType;
};

export default getOrderById;