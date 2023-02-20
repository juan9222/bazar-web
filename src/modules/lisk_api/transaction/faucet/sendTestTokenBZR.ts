import { cryptography, transactions } from "@liskhq/lisk-client";
import { getClient } from "../../util/getClient";

const sendTestTokenBZR = async (account: any, passphraseFaucet: string) => {
  const client = await getClient();

  try {
    const address = cryptography.getAddressFromBase32Address(account);
    const tx = await client.transaction.create({
      moduleID: 2,
      assetID: 0,
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      asset: {
        amount: BigInt(transactions.convertLSKToBeddows('100')),
        recipientAddress: address,
        data: 'BZR is sending Token for free'
      },
    }, passphraseFaucet);

    const response = await client.transaction.send(tx);
    console.log("Response:", response);
  } catch (error) {
    console.log("Faucet, error sending tokens: ", error);
  }
};

export default sendTestTokenBZR;