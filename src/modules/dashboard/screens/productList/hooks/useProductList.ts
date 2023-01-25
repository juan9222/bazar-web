import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCommonProviders from "../../../../common/providers";
import useProductListProviders from "../providers";
import axios from "axios";

const useProductList = () => {
  const [basicProducts, setBasicProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Array<any>>>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const [filteredProducts, setFilteredProducts] = useState<string>();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  //Providers
  const { getUser } = useCommonProviders();
  const { getBasicProducts, getProductsList } = useProductListProviders();
  const navigate = useNavigate();
  const location = useLocation();

  const userId: string = localStorage.getItem("uuid") || "";

  const onGetBasicProducts = async () => {
    const resp = await getBasicProducts();
    const productList = resp.data.results.map((product: any) => ({
      label: product.basic_product,
      value: product.uuid,
    }));
    setBasicProducts(productList);
  };

  const onGetProductList = async () => {
    const productsMap: Record<string, Array<any>> = {};
    basicProducts.forEach(async basicProduct => {
      const resp = await getProductsList(userId, basicProduct.label);
      productsMap[basicProduct.label] = resp.data.results;
    });
    setProductsMap(productsMap);
  };

  const onAddToProductList = async (basicProduct: string) => {
    if (!loadingProducts) {
      const newProductsMap = { ...productsMap };
      const resp = await getProductsList(userId, basicProduct);
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

  const onClickProductCard = (productId: string) => {
    navigate(`../products/${ productId }`, { replace: true, state: { previousUrl: location.pathname } });
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

  useEffect(() => {
    onGetProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, basicProducts);

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
  };
};

export default useProductList;