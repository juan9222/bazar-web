import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { BiSlider } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import Button from "../../../common/components/button";
import Card from "../../../common/components/card";
import InputText from "../../../common/components/inputText";
import { getProductIcon } from "../../../common/components/productIcon";
import { getMappedStatus } from "../productList/utils";
import useWishlist from "./hooks/useWishlist";

const Wishlist: React.FC<any> = () => {

  const { basicProducts, productList, avatarUrl, onClickProductCard, onLikeProduct } = useWishlist();

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
              <Button className={ `btn-second` } iconLeft={ getProductIcon(label) }>
                { label }
              </Button>
            )) }
          </div>
        </Col>
      </Row>
      <BrowserView>
        <Row className="mb-4 flex-column">
          <div className="content-cards-list">
            <Row xs={ 1 } sm={ 2 } lg={ 3 }>
              { productList && productList.length > 0 && productList.map((product) => {
                return (
                  <Col className="mb-3" >
                    <Card
                      status={ getMappedStatus(product.status) }
                      productImage={ product.url_images ? product.url_images[0] : "" }
                      avatar={ avatarUrl }
                      icon={ getProductIcon(product.basic_product) }
                      product={ product.basic_product }
                      hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                      productType={ product.product_type }
                      variety={ product.variety }
                      pricePerKg={ product.expected_price_per_kg }
                      availableForSale={ product.available_for_sale }
                      onClick={ () => onClickProductCard(product.uuid) }
                      likeable={ true }
                      isLiked={ product.is_liked }
                      onLiked={ (e) => onLikeProduct(e, product.uuid) }
                    />
                  </Col>
                );
              }) }
            </Row>
          </div>
        </Row>
      </BrowserView >
      <MobileView className="products-mobile-view mt-4">
        { productList && productList.length > 0 && productList.map((product) => {
          return (
            <div className="products-row mb-2">
              <div className={ `content-cards-list` }>
                { productList.map((product: any) => {
                  return (
                    <Card
                      status={ getMappedStatus(product.status) }
                      productImage={ product.url_images ?? "" }
                      avatar={ avatarUrl } //To-do Servicio que nos de el avatar del usuario ???
                      icon={ getProductIcon(product.basic_product) }
                      product={ product.basic_product }
                      hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                      productType={ product.product_type }
                      variety={ product.variety }
                      pricePerKg={ product.expected_price_per_kg }
                      availableForSale={ product.available_for_sale }
                      onClick={ () => onClickProductCard(product.uuid) }
                      likeable={ true }
                      isLiked={ product.is_liked }
                      onLiked={ (e) => onLikeProduct(e, product.uuid) }
                    />
                  );
                }) }
              </div>
            </div>
          );
        }) }
      </MobileView>
    </Container >
  );
};

export default Wishlist;