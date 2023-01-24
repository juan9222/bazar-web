import { transactions } from "@liskhq/lisk-client";
import { FileRecordType } from "../../types/fileRecordType";
import { getClient } from "../../util/getClient";

const newFileAsset = async (fileAsset: FileRecordType, passphrase: string) => {
  const client = await getClient();

  const FILE_ASSET = 1;

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

  client.invoke("seller:files", {
    transaction: client.transaction.encode(tx).toString('hex')
  }).then((res: any) => {
    console.log("Response:", res);
    process.exit(0);
  });
};

export default newFileAsset;