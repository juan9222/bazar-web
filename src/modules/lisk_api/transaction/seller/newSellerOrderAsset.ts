import { transactions } from "@liskhq/lisk-client";
import { RegisterOrderType } from "../../types/registerOrderAssetType";
import { getClient } from "../../util/getClient";

const newSellOrderAsset = async (orderAsset: RegisterOrderType, passphrase: string) => {
  const client = await getClient();
  const ORDER_ASSET = 0;

  try {
    const tx = await client.transaction.create({
      moduleID: 7007,
      assetID: ORDER_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        orderId: orderAsset.orderId,
        productId: orderAsset.productId,
        productName: orderAsset.productName,
        productDescription: orderAsset.productDescription,
        minQuantityToSell: BigInt(orderAsset.minQuantityToSell),
        quantity: BigInt(orderAsset.quantity),
        price: BigInt(orderAsset.price)
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Bazar chain transaction: OK ", response);
  } catch (error) {
    console.log("Error creating sell order: ", error);
  }

};

export default newSellOrderAsset;