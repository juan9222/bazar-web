// Dependencies
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Components
import InputText from "../../../common/components/inputText";
import Button from "../../../common/components/button";
import Pagination from 'react-bootstrap/Pagination';

// Icons
import { GoSearch } from 'react-icons/go';
import { BiSlider, BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { TbPlant2 } from 'react-icons/tb';
import { GiCoffeeBeans } from 'react-icons/gi';
import IconAvocado from "../../../../assets/svg/icons/iconAvocado";
import { BsFillCaretDownFill } from 'react-icons/bs';

// Hooks
import useProductList from "../../../common/hooks/useProductList";

const ProductListAdmin: React.FC<any> = () => {
  const { basicProducts, productMap, onFilterProducts, filteredProducts, } = useProductList();

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

  const getIconTrending = (label: string) => {
    return label === 'trendingUp' ? <BiTrendingUp /> : <BiTrendingDown />;
  };

  const isFilteredOut = (product: string) => {
    return filteredProducts.indexOf(product) === -1;
  };

  return (
    <Container className="pl">
      <Row>
        <h2 className="titlePrimary">Products list</h2>
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
            { basicProducts.map(({ label }, index) => (
              <Button key={ index } className={ `btn-second ${ isFilteredOut(label) ? '' : 'active' }` } iconLeft={ getIcon(label) } onClick={ () => onFilterProducts(label) }>
                { label }
              </Button>
            )) }
          </div>
        </Col>
      </Row>
      {/* Table Row */ }
      <div className="pl__table-admin table-admin-list d-lg-block d-none">
        {/* Table Head */ }
        <Row className="table-admin-head">
          <Col xs={ 2 } className="head-item">
            Product
            <BsFillCaretDownFill className="userApprovals__downIcon" />
          </Col>
          <Col xs={ 2 } className="head-item">Type</Col>
          <Col xs={ 2 } className="head-item">Market price (USD/kg)</Col>
          <Col xs={ 2 } className="head-item">Change</Col>
          <Col xs={ 2 } className="head-item">Users</Col>
          <Col xs={ 2 } className="head-item"></Col>
        </Row>
        {/* Table Body */ }
        <div className="table-admin-body">
          { productMap && Object.entries(productMap).map(([product, productList], index) => {
            return isFilteredOut(product) ? <div key={ index }></div> : (
              <div key={ index }>
                { productList.map((product: any, index) => {
                  return (
                    <Row key={ index } className="body-row-items">
                      <Col xs={ 2 } className="body-item" >{ getIcon(product.basic_product) }  { product.basic_product }</Col>
                      <Col xs={ 2 } className="body-item" >{ product.product_type }</Col>
                      <Col xs={ 2 } className="body-item" ><strong>{ product.expected_price_per_kg } USD</strong></Col>
                      <Col xs={ 2 } className="body-item trending-up" >{ getIconTrending('trendingUp') } 2.54</Col> {/* other class trending-down */ }
                      <Col xs={ 2 } className="body-item" ><img src="/assets/images/default-avatar.png" alt="User Avatar" width="39" height="39" /></Col>
                      <Col xs={ 2 } className="body-item" >View detail</Col>
                    </Row>
                  );
                }) }
              </div>
            );
          }) }
        </div>
      </div>
      {/* Card Row */ }
      <div className="pl__card_admin cards-admin-list d-lg-none d-block">
        { productMap && Object.entries(productMap).map(([product, productList], index) => {
          return isFilteredOut(product) ? <div key={ index }></div> : (
            <div key={ index }>
              { productList.map((product: any, index) => {
                return (
                  <Row key={ index } className="card-admin-item">
                    <Col className="card-content">
                      <Row className="d-flex align-items-center card-item no-border">
                        <Col>
                          <span>{ getIcon(product.basic_product) }  { product.basic_product }</span>
                        </Col>
                      </Row>
                      <Row className="card-item">
                        <Col><span>Type</span></Col>
                        <Col className="text-end"><span>{ product.product_type }</span></Col>
                      </Row>
                      <Row className="card-item">
                        <Col><span>Market price (USD/kg)</span></Col>
                        <Col className="text-end"><strong><span>{ product.expected_price_per_kg } USD</span></strong></Col>
                      </Row>
                      <Row className="card-item">
                        <Col><span>Change</span></Col>
                        <Col className="d-flex justify-content-end">
                          <span className="trending-up">{ getIconTrending('trendingUp') } 2.54</span>{/* other class trending-down */ }
                        </Col>
                      </Row>
                      <Row className="card-item align-items-center">
                        <Col><span>Users</span></Col>
                        <Col className="d-flex justify-content-end">
                          <img src="/assets/images/default-avatar.png" alt="User Avatar" width="39" height="39" />
                        </Col>
                      </Row>
                      <Row className="card-item no-border">
                        <Col className="d-flex justify-content-end">
                          <span className="cursor-pointer">View detail</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              }) }
            </div>
          );
        }) }
      </div>
      {/* Pagination Row */ }
      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.Item active>{ 1 }</Pagination.Item>
        </Pagination>
      </div>
    </Container>
  );
};

export default ProductListAdmin;
