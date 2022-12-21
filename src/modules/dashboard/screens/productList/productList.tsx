import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../common/components/button";
import { GiCoffeeBeans } from 'react-icons/gi';
import { TbPlant2 } from 'react-icons/tb';
import { GoSearch } from 'react-icons/go';
import { BiSlider } from 'react-icons/bi';
import IconAvocado from "../../../../assets/svg/icons/iconAvocado";
import InputText from "../../../common/components/inputText";
import Card from "../../../common/components/card";
import useProductList from "../../../common/hooks/useProductList";
import { Status } from "../../../common/components/card/interfaces";
import IconNewProduct from "../../../../assets/svg/icons/iconNewProduct";
import { NavLink } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';

const ProductList: React.FC<any> = () => {
  const { basicProducts, productMap, avatarUrl, onFilterProducts, filteredProducts, } = useProductList();

  const getIcon = (label: string) => {
    switch (label) {
      case "Coffee":
        return <GiCoffeeBeans />;
      case "Cocoa":
        return <TbPlant2 />;
      default:
        return <IconAvocado className={ 'icon-av' } />;
    }
  };

  const getMappedStatus = (status: string): Status => {
    switch (status) {
      case "Approved":
        return Status.public;
      case "Pending review":
        return Status.review;
      case "Hide":
        return Status.hidden;
      default:
        return Status.rejected;
    }
  };

  const isFilteredOut = (product: string) => {
    return filteredProducts.indexOf(product) === -1;
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
              <Button className={ `btn-second ${ isFilteredOut(label) ? '' : 'active' }` } iconLeft={ getIcon(label) } onClick={ () => onFilterProducts(label) }>
                { label }
              </Button>
            )) }
          </div>
        </Col>
      </Row>
      <BrowserView>
        { productMap && Object.entries(productMap).map(([product, productList]) => {
          return isFilteredOut(product) ? <></> : (
            <Row className="mb-4 flex-column">
              <div className="pl__content-card">
                <h3 className="titlePrimary">{ product }</h3>
              </div>
              <div className="content-cards-list">
                <Row xs={ 1 } sm={ 2 } lg={ 3 }>
                  { productList.map((product: any) => {
                    return (
                      <Col className="mb-3">
                        <Card
                          status={ getMappedStatus(product.status) }
                          productImage={ product.url_images ?? "" }
                          avatar={ avatarUrl }
                          icon={ getIcon(product.basic_product) }
                          product={ product.basic_product }
                          hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                          productType={ product.product_type }
                          variety={ product.variety }
                          pricePerKg={ product.expected_price_per_kg }
                          availableForSale={ product.available_for_sale }
                        />
                      </Col>
                    );
                  }) }
                </Row>
              </div>
            </Row>
          );
        }) }
      </BrowserView>
      <MobileView className="products-mobile-view mt-4">
        { productMap && Object.entries(productMap).map(([product, productList]) => {
          return isFilteredOut(product) ? <></> : (
            <div className="products-row mb-2">
              <div className="products-title">
                <h3 className="titlePrimary">{ product }</h3>
              </div>
              <div className={ `content-cards-list ${ filteredProducts.length === 1 && 'cards-list-column' }` }>
                { productList.map((product: any) => {
                  return (
                    <Card
                      status={ getMappedStatus(product.status) }
                      productImage={ product.url_images ?? "" }
                      avatar={ avatarUrl } //To-do Servicio que nos de el avatar del usuario ???
                      icon={ getIcon(product.basic_product) }
                      product={ product.basic_product }
                      hasCertificates={ product.sustainability_certifications && product.sustainability_certifications.length > 0 }
                      productType={ product.product_type }
                      variety={ product.variety }
                      pricePerKg={ product.expected_price_per_kg }
                      availableForSale={ product.available_for_sale }
                    />
                  );
                }) }
              </div>
            </div>
          );
        }) }
      </MobileView>
      <div className="btn-create-product">
        <NavLink className="btn-create-product__content"
          to="/dashboard/create-product">
          <IconNewProduct />
          <p>New product</p>
        </NavLink>
      </div>
    </Container>
  );
};

export default ProductList;
