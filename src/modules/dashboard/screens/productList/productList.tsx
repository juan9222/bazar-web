import React, { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";
import { GoSearch } from 'react-icons/go';
import { BiSlider } from 'react-icons/bi';
import InputText from "../../../common/components/inputText";
import Card from "../../../common/components/card";
import useProductList from "./hooks/useProductList";
import IconNewProduct from "../../../../assets/svg/icons/iconNewProduct";
import { NavLink } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';
import { getProductIcon } from "../../../common/components/productIcon";
import { getMappedStatus, isCurrentFilter } from "./utils";
import { useUser } from "../../layouts/dashboardLayout/utils";

const ProductList: React.FC<any> = () => {
  const { basicProducts, productsMap, avatarUrl, onFilterProducts, filteredProducts, onClickProductCard, onLikeProduct, onAddToProductList, setLoadingProducts, onPublish } = useProductList();

  const { authenticatedUser } = useUser();

  const listsRef = useRef<any[]>([]);

  const handleScroll = async (e: any, index: number, basicProduct: string) => {
    if (listsRef.current[index]) {
      const { scrollLeft, scrollWidth, clientWidth } = listsRef.current[index];
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setLoadingProducts(true);
        await onAddToProductList(basicProduct);
        listsRef.current[index].scrollLeft = scrollLeft;
      }
    }
  };

  return (
    <Container className="pl">
      <Row>
        <h2 className="titlePrimary">My products</h2>
      </Row>
      <Row>
        <Col className="pl__col-search" md={ 5 }>
          <div className="pl__col-search__inputs">
            <InputText name={ 'productSearch' } iconLeft={ <GoSearch /> } />
            <Button className={ 'btn-search-ad btn-desktop' } iconLeft={ <BiSlider /> }></Button>
          </div>
        </Col>
        <Col className="pl__col-buttons" md={ 7 }>
          <div className="pl__col-buttons__list">
            <Button className={ 'btn-search-ad btn-mobile' } iconLeft={ <BiSlider /> }></Button>
            { basicProducts.map(({ label }) => (
              <Button className={ `btn-second ${ filteredProducts === label ? 'active' : '' }` } key={ label }
                iconLeft={ getProductIcon(label) } onClick={ () => onFilterProducts(label) }>
                { label }
              </Button>
            )) }
          </div>
        </Col>
      </Row>
      <BrowserView className="products-mobile-view mt-4">
        { productsMap && Object.entries(productsMap).map(([basicProduct, productList], index) => {
          return isCurrentFilter(filteredProducts, basicProduct) ? (
            <div className="products-row mb-2">
              <div className="pl__content-card">
                <h3 className="titlePrimary">{ basicProduct }</h3>
              </div>
              <div className="content-cards-list" onScroll={ e => handleScroll(e, index, basicProduct) } ref={ ref => listsRef.current[index] = ref }>
                { productList.map((product: any) => {
                  return (
                    <Card
                      status={ getMappedStatus(product.status) }
                      productImage={ product.url_images ? product.url_images[0] : "" }
                      avatar={ product.url_avatar }
                      icon={ getProductIcon(product.basic_product) }
                      product={ product.basic_product }
                      hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                      productType={ product.product_type }
                      variety={ product.variety }
                      pricePerKg={ product.expected_price_per_kg }
                      availableForSale={ product.available_for_sale }
                      onClick={ (e) => onClickProductCard(e, product.basic_product, product.uuid) }
                      likeable={ authenticatedUser?.role === 'Buyer' }
                      isLiked={ product.is_liked }
                      onLiked={ (e) => onLikeProduct(e, basicProduct, product.uuid, product.is_liked) }
                      onPublish={ (e) => onPublish(e, product.basic_product, product.uuid) }
                    />
                  );
                }) }
              </div>
            </div>
          ) : <></>;
        }) }
      </BrowserView>
      <MobileView className="products-mobile-view mt-4">
        { productsMap && Object.entries(productsMap).map(([basicProduct, productList], index) => {
          return isCurrentFilter(filteredProducts, basicProduct) ? (
            <div className="products-row mb-2">
              <div className="products-title">
                <h3 className="titlePrimary">{ basicProduct }</h3>
              </div>
              <div className={ `content-cards-list ${ filteredProducts && 'cards-list-column' }` } onScroll={ e => handleScroll(e, index, basicProduct) } ref={ ref => listsRef.current[index] = ref }>
                { productList.map((product: any) => {
                  return (
                    <Card
                      status={ getMappedStatus(product.status) }
                      productImage={ product.url_images ?? "" }
                      avatar={ avatarUrl }
                      icon={ getProductIcon(product.basic_product) }
                      product={ product.basic_product }
                      hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                      productType={ product.product_type }
                      variety={ product.variety }
                      pricePerKg={ product.expected_price_per_kg }
                      availableForSale={ product.available_for_sale }
                      onClick={ (e) => onClickProductCard(e, basicProduct, product.uuid) }
                      likeable={ authenticatedUser?.role === 'Buyer' }
                      isLiked={ product.is_liked }
                      onLiked={ (e) => onLikeProduct(e, basicProduct, product.uuid, product.is_liked) }
                    />
                  );
                }) }
              </div>
            </div>
          ) : <></>;
        }) }
      </MobileView>
      { authenticatedUser?.role !== 'Buyer' && (
        <div className="btn-create-product">
          <NavLink className="btn-create-product__content"
            to="/dashboard/create-product">
            <IconNewProduct />
            <p>New product</p>
          </NavLink>
        </div>
      ) }
    </Container>
  );
};

export default ProductList;
