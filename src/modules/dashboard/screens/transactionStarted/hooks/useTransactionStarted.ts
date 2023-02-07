import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetailsProviders from "../../productDetails/providers";

const useTransactionStarted = () => {

  const navigate = useNavigate();

  // const [resultBinanceTx, setResultBinanceTx] = useState();
  // const [productId, setProductId] = useState();
  // const [quantityToBuy, setQuantityToBuy] = useState();
  const [receiptTx, setReceiptTx] = useState();
  const { state } = useLocation();
  let resultBinanceTx: any, productId, quantityToBuy;
  if (state !== null) {
    resultBinanceTx = state.resultBinanceTx;
    productId = state.productId;
    quantityToBuy = state.quantityToBuy;
  }

  const { patchProductAvailability } = useProductDetailsProviders();

  const getReceiptTx = async () => {
    if (resultBinanceTx) {
      const resp = await (resultBinanceTx as any).wait(1);
      setReceiptTx(resp);
    }
  };

  useEffect(() => {
    if (receiptTx) {
      console.log("Binance Transaction:", receiptTx);


      if ((receiptTx as any).status === 1) {
        try {
          // patchProductAvailability(productId!, quantityToBuy!);
          navigate('../payment-summary/1');
        } catch (error) {
          alert('Something went wrong');
        }
      } else {
        alert(JSON.stringify(receiptTx));
      }
    }
  }, [receiptTx]);

  useEffect(() => {
    getReceiptTx();
  }, [resultBinanceTx]);

  return {
    // setResultBinanceTx,
    // setProductId,
    // setQuantityToBuy,
  };
};

export default useTransactionStarted;