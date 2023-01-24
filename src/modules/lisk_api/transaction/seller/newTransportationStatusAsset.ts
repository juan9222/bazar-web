import { transactions } from "@liskhq/lisk-client";
import { TransportStatusType } from "../../types/transportStatusType";
import { getClient } from "../../util/getClient";

const newTransportationStatus = async (transporationStatusType: TransportStatusType, passphrase: string) => {
  const client = await getClient();

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

  client.invoke("seller:transportStatus", {
    transaction: client.transaction.encode(tx).toString('hex')
  }).then((res: any) => {
    console.log("Response: ", res);
    process.exit(0);
  });
};

export default newTransportationStatus;