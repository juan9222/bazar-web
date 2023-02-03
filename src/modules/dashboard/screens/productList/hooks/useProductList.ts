import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCommonProviders from "../../../../common/providers";
import useProductListProviders from "../providers";
import axios from "axios";
import { useUser } from "../../../layouts/dashboardLayout/utils";
import getCreateSellOrderContract from "../../../../wallet/helper/getCreateSellOrderContract";
import { BAZAR_NETWORK_BLOCKCHAIN_NAME } from "../../../../wallet/helper/constantHelper";
import useBazarWalletProviders from "../../../../lisk_api/providers";
import { RegisterOrderType } from "../../../../lisk_api/types/registerOrderAssetType";
import newSellOrderAsset from "../../../../lisk_api/transaction/seller/newSellerOrderAsset";
import { randomUUID } from "crypto";

const useProductList = () => {
  const [basicProducts, setBasicProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Array<any>>>();
  const [totalProductsMap, setTotalProductsMap] = useState<Record<string, number>>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const [filteredProducts, setFilteredProducts] = useState<string>();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingBasicProducts, setLoadingBasicProducts] = useState<boolean>(false);
  const [showConnectWalletDialog, setShowConnectWalletDialog] = useState<boolean>(false);
  const [showPublishDialog, setShowPublishDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>();

  //Providers
  const { getUser } = useCommonProviders();
  const { getBasicProducts, getProductsList } = useProductListProviders();
  const navigate = useNavigate();
  const location = useLocation();

  const { binanceAccount } = useUser();
  const { getWalletByUser } = useBazarWalletProviders();

  const userId: string = localStorage.getItem("uuid") || "";

  const onGetBasicProducts = async () => {
    if (!loadingBasicProducts) {
      setLoadingBasicProducts(true);
      const resp = await getBasicProducts();
      const productList = resp.data.results.map((product: any) => ({
        label: product.basic_product,
        value: product.uuid,
      }));
      const newProductsMap: Record<string, Array<any>> = {};
      const newTotalProductsMap: Record<string, number> = {};
      const promises: any[] = [];
      productList.forEach((product: any) => {
        promises.push(getProductsList(userId, product.label, 0));
      });
      const result = await Promise.all(promises);
      result.forEach(promise => {
        if (promise.data.results.length > 0) {
          newProductsMap[promise.data.results[0].basic_product] = promise.data.results;
          newTotalProductsMap[promise.data.results[0].basic_product] = promise.data.total;
        }
      });
      setBasicProducts(productList);
      setProductsMap(newProductsMap);
      setTotalProductsMap(newTotalProductsMap);
      setLoadingBasicProducts(false);
    }
  };

  const onAddToProductList = async (basicProduct: string) => {
    const offset = productsMap && productsMap[basicProduct].length;
    if (!loadingProducts && totalProductsMap && offset! < totalProductsMap[basicProduct]) {
      setLoadingProducts(true);
      const newProductsMap = { ...productsMap };
      const resp = await getProductsList(userId, basicProduct, offset!);
      const newProductList = newProductsMap[basicProduct].concat(resp.data.results);
      newProductsMap[basicProduct] = newProductList;
      setProductsMap(newProductsMap);
      setLoadingProducts(false);
    }
  };

  const onGetUser = async () => {
    const resp = await getUser(userId);
    setAvatarUrl(resp.data.company[0].profile_image_url ?? undefined);
  };

  const onFilterProducts = (product: string) => {
    setFilteredProducts(product === filteredProducts ? undefined : product);
  };

  const onClickProductCard = (event: React.MouseEvent, product: any) => {
    if ((event.target as any).innerText === 'Publish') {
      onPublish(event, product);
    } else if ((event.target as any).innerText === 'Hide') {
      onHide(event, product);
    } else {
      navigate(`../products/${ product.uuid }`, { replace: true, state: { previousUrl: location.pathname } });
    }
  };

  const onLikeProduct = async (event: React.MouseEvent, basicProduct: string, productId: string, isLiked: boolean) => {
    event.stopPropagation();
    try {
      const newProductMap = { ...productsMap };
      if (!isLiked) {
        await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/wishlist/?user_uuid=${ userId }&product_uuid=${ productId }`, {});
      } else {
        await axios.delete(`${ process.env.REACT_APP_BAZAR_URL }/wishlist/?user_uuid=${ userId }&product_uuid=${ productId }`, {});
      }
      if (productsMap) {
        newProductMap[basicProduct] = newProductMap[basicProduct].map((product: any) => { return { ...product, is_liked: product.uuid === productId ? !isLiked : product.is_liked }; });
      }
      setProductsMap(newProductMap);
    } catch (error) {
      alert('Something went wrong. Try again.');
    }
  };

  const onPublish = (event: React.MouseEvent, _product: any) => {
    event.stopPropagation();
    setShowPublishDialog(true);
    setSelectedProduct(_product);
  };

  const publishProduct = async () => {
    if (!binanceAccount) {
      setShowConnectWalletDialog(true);
      return;
    }
    try {
      const bazarContract = getCreateSellOrderContract(binanceAccount);
      const minQuantityToSell = 1;
      const sellerTradingFee = 2;

      try {
        const requestBody = {
          "userUUID": localStorage.getItem("uuid") || "",
          "blockchainName": BAZAR_NETWORK_BLOCKCHAIN_NAME.toString()
        };

        const resultGetWalletData = await getWalletByUser(requestBody);

        if (resultGetWalletData.data.data) {
          let resulBinanceTx;
          const productNumberCode = Math.floor((Math.random() * (99999 - 10000) + 10000));

          resulBinanceTx = await bazarContract.createSaleOrder(
            productNumberCode,
            minQuantityToSell,
            selectedProduct.available_for_sale,
            selectedProduct.expected_price_per_kg,
            sellerTradingFee
          );

          const receiptTx = await resulBinanceTx.wait(1);
          console.log("Binance Transaction:", receiptTx);

          if (receiptTx.status === 1) {
            /* let orderId = randomUUID();
             const sellOrderAsset: RegisterOrderType = {
               orderId: orderId,
               productId: productNumberCode.toString(),
               productName: selectedProduct.basic_product,
               productDescription: selectedProduct.product_type + " | " + selectedProduct.variety,
               minQuantityToSell: minQuantityToSell.toString(),
               quantity: selectedProduct.available_for_sale.toString(),
               price: selectedProduct.expected_price_per_kg.toString(),
               files: [],
               transport: []
             };
   
             const transactionId = await newSellOrderAsset(sellOrderAsset, resultGetWalletData.data.data.passphrases.toString());
   
             console.log("Bazar Network Transaction:", transactionId);
             */

            const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-publish/${ selectedProduct.uuid }`);
            const newProductsMap = { ...productsMap };
            const productIndex = newProductsMap[selectedProduct.basic_product].findIndex((product: any) => product.uuid === selectedProduct.uuid);
            newProductsMap[selectedProduct.basic_product][productIndex] = { ...newProductsMap[selectedProduct.basic_product][productIndex], status: resp.data.status };
            setProductsMap(newProductsMap);
          } else {
            console.log('Binance Transactions is rejected.');
            alert('Binance Transactions is rejected. Try again.');
          }
        } else {
          console.log('Something went wrong getting credentials.' + resultGetWalletData.data.errorMessage);
          alert('Something went wrong getting credentials. Try again.');
        }
      } catch (error) {
        console.log('Something went wrong accepting the BSC contract.' + error);
        alert('Something went wrong accepting the BSC contract. Try again.');
      }
    } catch (error) {
      console.log('Something went wrong. Try again.' + error);
      alert('Something went wrong. Try again.');
    } finally {
      setShowPublishDialog(false);
    }
  };

  const onHide = async (event: React.MouseEvent, _product: any) => {
    event.stopPropagation();
    try {
      const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-hidden/${ _product.uuid }`);
      const newProductsMap = { ...productsMap };
      const productIndex = newProductsMap[_product.basic_product].findIndex((product: any) => product.uuid === _product.uuid);
      newProductsMap[_product.basic_product][productIndex] = { ...newProductsMap[_product.basic_product][productIndex], status: resp.data.status };
      setProductsMap(newProductsMap);
    } catch (error) {
      console.log('Something went wrong. Try again.' + error);
      alert('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    onGetBasicProducts();
    onGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    basicProducts,
    productsMap,
    avatarUrl,
    onFilterProducts,
    filteredProducts,
    onClickProductCard,
    onLikeProduct,
    onAddToProductList,
    setLoadingProducts,
    onPublish,
    publishProduct,
    onHide,
    showConnectWalletDialog,
    setShowConnectWalletDialog,
    binanceAccount,
    showPublishDialog,
    setShowPublishDialog,
  };
};

export default useProductList;
