import { transactions } from "@liskhq/lisk-client";
import { RegisterOrderType } from "../../types/registerOrderAssetType";
import { getClient } from "../../util/getClient";

const newSellOrderAsset = async (orderAsset: RegisterOrderType, passphrase: string) => {

  getClient().then(async (client) => {

    const ORDER_ASSET = 0;

    const tx = await client.transaction.create({
      moduleID: 7007,
      assetID: ORDER_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        productId: orderAsset.productId,
        productName: orderAsset.productName,
        productDescription: orderAsset.productDescription,
        minQuantityToSell: BigInt(orderAsset.minQuantityToSell),
        quantity: BigInt(orderAsset.quantity),
        price: BigInt(orderAsset.price)
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Response: ", response);

  }).catch((err) => {
    console.log("Error creating sell order: ", err);
  });

};

export default newSellOrderAsset;