import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCommonProviders from "../../../../common/providers";
import useProductListProviders from "../providers";
import axios from "axios";
import { useUser } from "../../../layouts/dashboardLayout/utils";
import getCreateSellOrderContract from "../../../../wallet/helper/getCreateSellOrderContract";

const useProductList = () => {
  const [basicProducts, setBasicProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Array<any>>>();
  const [totalProductsMap, setTotalProductsMap] = useState<Record<string, number>>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const [filteredProducts, setFilteredProducts] = useState<string>();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingBasicProducts, setLoadingBasicProducts] = useState<boolean>(false);

  //Providers
  const { getUser } = useCommonProviders();
  const { getBasicProducts, getProductsList } = useProductListProviders();
  const navigate = useNavigate();
  const location = useLocation();

  const { binanceAccount } = useUser();

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
      productList.forEach((basicProduct: { label: string; value: string; }) => {
        newProductsMap[basicProduct.label] = [];
      });
      const totalProductsMap: Record<string, number> = {};
      const promises: any[] = [];
      productList.forEach((product: any) => {
        promises.push(getProductsList(userId, product.label, 0));
      });
      const result = await Promise.all(promises);
      result.forEach(promise => {
        console.log(promise);
        promise.data.results.forEach((product: any) => {
          newProductsMap[product.basic_product].push(product);
          totalProductsMap[product.basic_product] = promise.data.total;
        });
      });
      setBasicProducts(productList);
      setProductsMap(newProductsMap);
      setTotalProductsMap(totalProductsMap);
      setLoadingBasicProducts(false);
    }
  };

  const onAddToProductList = async (basicProduct: string) => {
    const offset = productsMap && productsMap[basicProduct].length;
    if (!loadingProducts && totalProductsMap && offset! < totalProductsMap[basicProduct]) {
      const newProductsMap = { ...productsMap };
      const resp = await getProductsList(userId, basicProduct, offset!);
      newProductsMap[basicProduct].push(resp.data.results);
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

  const onClickProductCard = (event: React.MouseEvent, basicProduct: string, product: any) => {
    if ((event.target as any).innerText === 'Publish') {
      onPublish(event, product);
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

  const onPublish = async (event: React.MouseEvent, _product: any) => {
    event.stopPropagation();
    try {
      const bazarContract = getCreateSellOrderContract(binanceAccount);

      const result = await bazarContract.createSaleOrder(
        2023, // Product number code
        1, //Note: MinQuantiyToSell
        _product.available_for_sale,
        _product.expected_price_per_kg,
      );

      console.log("Binance Transaction:", result);

      const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-publish/${ _product.uuid }`);
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
  };
};

export default useProductList;