import { useState } from "react";
import { passphrase, cryptography } from "@liskhq/lisk-client";

const useAccountBazarchain = () => {
  const pass = passphrase.Mnemonic.generateMnemonic();
  const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(pass);

  const credentials = {
    address: cryptography.getBase32AddressFromPassphrase(pass),
    binaryAddress: cryptography.getAddressFromPassphrase(pass).toString("hex"),
    bazar_passphrase: pass,
    publickey: keys.publicKey.toString("hex"),
    privatekey: keys.privateKey.toString("hex"),
  };

  return {
    credentials
  };
};

export default useAccountBazarchain;
