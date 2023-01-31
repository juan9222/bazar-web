import { getClient } from "../../util/getClient";
import { codec } from "@liskhq/lisk-codec";
import { buyerOrderSchema } from "../../schema/buyerOrderSchema";
import { RegisterBuyerOrderType } from "../../types/registerBuyerOrderType";

//TODO: This is not working
const getTransactionById = async (transactionId: string) => {
  getClient().then(async (client) => {

    const result = await client.transaction.get(transactionId);
    let vararr: RegisterBuyerOrderType = codec.decode(buyerOrderSchema, Buffer.from(result.asset.toString()));

    if (result) {
      console.log("Transaction call value: " + vararr.productName);
    }
  });
};

export default getTransactionById;