import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCommonProviders from "../../../../common/providers";
import useProductListProviders from "../providers";
import axios from "axios";

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

  const onClickProductCard = (event: React.MouseEvent, basicProduct: string, productId: string) => {
    if ((event.target as any).innerText === 'Publish') {
      onPublish(event, basicProduct, productId);
    } else {
      navigate(`../products/${ productId }`, { replace: true, state: { previousUrl: location.pathname } });
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

  const onPublish = async (event: React.MouseEvent, basicProduct: string, productId: string) => {
    event.stopPropagation();
    try {
      const resp = await axios.patch(`${ process.env.REACT_APP_BAZAR_URL }/products/update-publish/${ productId }`);
      const newProductsMap = { ...productsMap };
      const productIndex = newProductsMap[basicProduct].findIndex((product: any) => product.uuid === productId);
      newProductsMap[basicProduct][productIndex] = { ...newProductsMap[basicProduct][productIndex], status: resp.data.status };
      setProductsMap(newProductsMap);
    } catch (error) {
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