import { transactions } from "@liskhq/lisk-client";
import { FileRecordType } from "../../types/fileRecordType";
import { getClient } from "../../util/getClient";

const newFileAsset = async (fileAsset: FileRecordType, passphrase: string) => {
  const client = await getClient();
  const FILE_ASSET = 1;

  try {
    const tx = await client.transaction.create({
      moduleID: 7007,
      assetID: FILE_ASSET,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        orderId: fileAsset.orderId,
        filename: fileAsset.filename,
        fileType: fileAsset.fileType,
        fileCategory: fileAsset.fileCategory,
        hash: fileAsset.hash
      }
    }, passphrase);

    const response = await client.transaction.send(tx);
    console.log("Response: ", response);
  } catch (error) {
    console.log("Error adding files to seller order:", error);
  }
};

export default newFileAsset;