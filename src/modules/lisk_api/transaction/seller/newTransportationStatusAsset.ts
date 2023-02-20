import { transactions } from "@liskhq/lisk-client";
import { TransportStatusType } from "../../types/transportStatusType";
import { getClient } from "../../util/getClient";

const newTransportationStatus = async (transporationStatusType: TransportStatusType, passphrase: string) => {

  getClient().then(async (client) => {

    const TRANSPORTATION_STATUS_ASSET = 2;

    const tx = await client.transaction.create({
      moduleID: 7007,
      assetID: TRANSPORTATION_STATUS_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        orderId: transporationStatusType.orderId,
        origin: transporationStatusType.origin,
        destiny: transporationStatusType.destiny,
        location: transporationStatusType.location
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Response: ", response);

  }).catch((err) => {
    console.log("Error adding transportation status to seller order: ", err);
  });

};

export default newTransportationStatus;