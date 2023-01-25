import { transactions } from "@liskhq/lisk-client";
import { RegisterBuyerOrderType } from "../../types/registerBuyerOrderType";
import { getClient } from "../../util/getClient";

const newBuyerOrderAsset = async (orderAsset: RegisterBuyerOrderType, passphrase: string) => {

  getClient().then(async (client) => {

    const ORDER_ASSET = 0;

    const tx = await client.transaction.create({
      moduleID: 7008,
      assetID: ORDER_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        sellerOrderId: orderAsset.sellerOrderId,
        productName: orderAsset.productName,
        quantity: BigInt(orderAsset.quantity),
        price: BigInt(orderAsset.price)
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Response: ", response);

  }).catch((err) => {
    console.log("Error creating buy order: ", err);
  });

};

export default newBuyerOrderAsset;