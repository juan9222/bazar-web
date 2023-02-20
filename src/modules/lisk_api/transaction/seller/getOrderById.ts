import { OrderType } from "../../types/orderType";
import { getClient } from "../../util/getClient";

const getOrderById = async (orderId?: string) => {
  const client = await getClient();
  return client.invoke("seller:getOrder", {
    id: orderId
  }) as OrderType;
};

export default getOrderById;