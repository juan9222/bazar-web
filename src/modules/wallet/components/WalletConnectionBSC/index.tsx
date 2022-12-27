import { useWeb3React } from '@web3-react/core';
import React, { useCallback } from "react";
import useWalletConnectionBSC from "../../hooks/useWallletConnectionBSC";

const WalletConnectionBSCSelection = () => {

  const { activate, deactivate, account } = useWeb3React();

  const activateOnClick = useCallback((): void => {
    activate(useWalletConnectionBSC);
  }, []);

  const aaccountShorter = (value: String | null | undefined) => {
    if (value !== null && value !== undefined) {
      let firstPart: String | undefined = value?.toString().substring(0, 5);
      let secondPart: string | undefined = value?.toString().substring(33);
      return firstPart?.toString() + "..." + secondPart?.toString();
    }
  };

  return (
    <div style={ { marginBottom: '1rem' } }>
      <>
        Binance Wallet
        <br />
        { aaccountShorter(account)
          ? <button onClick={ () => deactivate() }>Log out</button>
          :
          <button onClick={ () => activateOnClick() }>Connect</button>
        }
        <br />
        { aaccountShorter(account) }
      </>
    </div >
  );
};

export default WalletConnectionBSCSelection;