// Dependencies
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Components
import InputText from "../../../common/components/inputText";
import Button from "../../../common/components/button";

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
            { basicProducts.map(({ label }) => (
              <Button className={ `btn-second ${ isFilteredOut(label) ? '' : 'active' }` } iconLeft={ getIcon(label) } onClick={ () => onFilterProducts(label) }>
                { label }
              </Button>
            )) }
          </div>
        </Col>
      </Row>
      {/* Table Row */ }
      <div className="pl__table-admin mb-4 d-lg-block d-none">
        {/* Table Head */ }
        <Row className="userApprovals__tableHead">
          <Col xs={ 2 } className="userApprovals__tableHeadName">
            Product
            <BsFillCaretDownFill className="userApprovals__downIcon" />
          </Col>
          <Col xs={ 2 } className="p-0">Type</Col>
          <Col xs={ 2 } className="p-0">Market price (USD/kg)</Col>
          <Col xs={ 2 } className="p-0">Change</Col>
          <Col xs={ 2 } className="p-0">Users</Col>
          <Col xs={ 2 } className="p-0"></Col>
        </Row>
        {/* Table Body */ }
        <div className="userApprovals__tableBody">
          { productMap && Object.entries(productMap).map(([product, productList]) => {
            return isFilteredOut(product) ? <></> : (
              <div>
                { productList.map((product: any) => {
                  return (
                    <Row key={ product.basic_product_uuid } className="userApprovals__tableRow">
                      <Col xs={ 2 } >{ getIcon(product.basic_product) }  { product.basic_product }</Col>
                      <Col xs={ 2 } >{ product.product_type }</Col>
                      <Col xs={ 2 } >{ product.expected_price_per_kg } USD</Col>
                      <Col xs={ 2 } >{ getIconTrending('trendingUp') } 2.54</Col>
                      <Col xs={ 2 } ><img src="/assets/images/default-avatar.png" alt="User Avatar" width="39" height="39" /></Col>
                      <Col xs={ 2 } >View detail</Col>
                    </Row>
                  );
                }) }
              </div>
            );
          }) }
        </div>
      </div>
    </Container>
  );
};

export default ProductListAdmin;
