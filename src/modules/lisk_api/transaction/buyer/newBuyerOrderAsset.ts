import { transactions } from "@liskhq/lisk-client";
import { RegisterBuyerOrderType } from "../../types/registerBuyerOrderType";
import { getClient } from "../../util/getClient";

const newBuyerOrderAsset = async (orderAsset: RegisterBuyerOrderType, passphrase: string) => {
  const client = await getClient();
  const ORDER_ASSET = 0;

  try {
    const tx = await client.transaction.create({
      moduleID: 7008,
      assetID: ORDER_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        buyerOrderId: orderAsset.buyerOrderId,
        sellerOrderId: orderAsset.sellerOrderId,
        status: orderAsset.status,
        token: orderAsset.token,
        exchangeRate: orderAsset.exchangeRate,
        valueXKg: orderAsset.valueXKg,
        quantity: BigInt(orderAsset.quantity),
        serviceFee: orderAsset.serviceFee,
        totalPayToken: orderAsset.totalPayToken,
        totalPayInUSD: orderAsset.totalPayInUSD,
        transacctionPayment: orderAsset.transacctionPayment,
        accountSeller: orderAsset.accountSeller,
        accountBuyer: orderAsset.accountBuyer,
        productId: orderAsset.productId
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Response: OK", response);
  } catch (error) {
    console.log("Error creating buy order: ", error);
  }
};

export default newBuyerOrderAsset;