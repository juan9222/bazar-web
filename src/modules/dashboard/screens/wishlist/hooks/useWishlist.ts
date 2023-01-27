import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductListProviders from "../../productList/providers";
import useWishlistProviders from "../providers";

const useWishlist = () => {
  const [basicProducts, setBasicProducts] = useState<Array<{ label: string; value: string; }>>([]);
  const [productList, setProductList] = useState<Array<any>>();

  //Providers
  const { getBasicProducts } = useProductListProviders();
  const { getWishlistProducts } = useWishlistProviders();
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

  const onGetWishlistProducts = async () => {
    const resp = await getWishlistProducts(userId);
    setProductList(resp.data.results);
  };

  const onClickProductCard = (productId: string) => {
    navigate(`../products/${ productId }`, { replace: true, state: { previousUrl: location.pathname } });
  };

  const onLikeProduct = async (event: React.MouseEvent, productId: string) => {
    event.stopPropagation();
    try {
      await axios.delete(`${ process.env.REACT_APP_BAZAR_URL }/wishlist/?user_uuid=${ userId }&product_uuid=${ productId }`, {});
      if (productList) {
        const newProductList = [...productList];
        const productIndex = newProductList.findIndex((product: any) => product.uuid = productId);
        newProductList.splice(productIndex, 1);
        setProductList(newProductList);
      }
    } catch (error) {
      alert('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    onGetBasicProducts();
    onGetWishlistProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    basicProducts,
    productList,
    onClickProductCard,
    onLikeProduct,
  };
};

export default useWishlist;