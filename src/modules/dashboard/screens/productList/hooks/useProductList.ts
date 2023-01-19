import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommonProviders from "../../../../common/providers";
import useProductListProviders from "../providers";
import axios from "axios";

const useProductList = () => {
  const [basicProducts, setBasicProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productMap, setProductMap] = useState<Record<string, Array<any>>>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const [filteredProducts, setFilteredProducts] = useState<Array<string>>([]);

  //Providers
  const { getUser } = useCommonProviders();
  const { getBasicProducts, getSellerProducts } = useProductListProviders();
  const navigate = useNavigate();

  const userId: string = localStorage.getItem("uuid") || "";

  const onGetBasicProducts = async () => {
    const resp = await getBasicProducts();
    const productList = resp.data.results.map((product: any) => ({
      label: product.basic_product,
      value: product.uuid,
    }));
    setBasicProducts(productList);
    setFilteredProducts(productList.map((product: any) => product.label));
  };

  const onGetSellerProducts = async () => {
    const resp = await getSellerProducts(userId);
    const productMap: Record<string, Array<any>> = {};
    resp.data.results.forEach((product: any) => {
      if (!productMap[product.basic_product]) {
        productMap[product.basic_product] = [];
      }
      productMap[product.basic_product].push(product);
    });
    setProductMap(productMap);
  };

  const onGetUser = async () => {
    const resp = await getUser(userId);
    setAvatarUrl(resp.data.company[0].profile_image_url ?? undefined);
  };

  const onFilterProducts = (product: string) => {
    const newFilteredProducts = [...filteredProducts];
    const index = newFilteredProducts.indexOf(product);
    if (index === -1) {
      newFilteredProducts.push(product);
    } else {
      newFilteredProducts.splice(index, 1);
    }
    setFilteredProducts(newFilteredProducts);
  };

  const onClickProductCard = (productId: string) => {
    navigate(`../products/${ productId }`, { replace: true, state: { test: 2 } });
  };

  const onLikeProduct = async (event: React.MouseEvent, basicProduct: string, productId: string, isLiked: boolean) => {
    event.stopPropagation();
    try {
      const newProductMap = { ...productMap };
      if (!isLiked) {
        await axios.post(`${ process.env.REACT_APP_BAZAR_URL }/wishlist/?user_uuid=${ userId }&product_uuid=${ productId }`, {});
      } else {
        await axios.delete(`${ process.env.REACT_APP_BAZAR_URL }/wishlist/?user_uuid=${ userId }&product_uuid=${ productId }`, {});
      }
      if (productMap) {
        newProductMap[basicProduct] = newProductMap[basicProduct].map((product: any) => { return { ...product, is_liked: product.uuid === productId ? !isLiked : product.is_liked }; });
      }
      setProductMap(newProductMap);
    } catch (error) {
      alert('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    onGetBasicProducts();
    onGetSellerProducts();
    onGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    basicProducts,
    productMap,
    avatarUrl,
    onFilterProducts,
    filteredProducts,
    onClickProductCard,
    onLikeProduct,
  };
};

export default useProductList;