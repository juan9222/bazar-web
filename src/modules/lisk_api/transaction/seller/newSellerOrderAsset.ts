import { transactions } from "@liskhq/lisk-client";
import { RegisterOrderType } from "../../types/registerOrderAssetType";
import { getClient } from "../../util/getClient";

const newSellOrderAsset = async (orderAsset: RegisterOrderType, passphrase: string) => {
  const client = await getClient();

  const ORDER_ASSET = 0;

  const tx = await client.transaction.create({
    moduleID: 7007,
    assetID: ORDER_ASSET,
    fee: BigInt(transactions.convertLSKToBeddows('0.01')),
    asset: {
      productId: orderAsset.productId,
      productName: orderAsset.productName,
      productDescription: orderAsset.productDescription,
      minQuantityToSell: orderAsset.minQuantityToSell,
      quantity: orderAsset.quantity,
      price: orderAsset.price
    }
  }, passphrase);

  client.invoke("seller:order", {
    transaction: client.transaction.encode(tx).toString('hex')
  }).then((res: any) => {
    console.log("Response: ", res);
    process.exit(0);
  });
};

export default newSellOrderAsset;