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

const ProductList: React.FC<any> = () => {
  return (
    <Container className="pl">
      <Row>
        <h2 className="titlePrimary">My products</h2>
      </Row>
      <Row className="mb-5">
        <Col className="pl__col-search" md={ 5 }>
          <div className="pl__col-search__inputs">
            <InputText name={ 'productSearch' } iconLeft={ <GoSearch /> } />
            <Button className={ 'btn-search-ad' } iconLeft={ <BiSlider /> }></Button>
          </div>
        </Col>
        <Col className="pl__col-buttons" md={ 7 }>
          <div className="pl__col-buttons__list">
            <Button className={ 'btn-second active' } iconLeft={ <GiCoffeeBeans /> }>
              Coffe
            </Button>
            <Button className={ 'btn-second' } iconLeft={ <TbPlant2 /> }>
              Cacao
            </Button>
            <Button className={ 'btn-second' } iconLeft={ <IconAvocado className={ 'icon-av' } /> }>
              Avocado
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <div className="pl__content-card">
          <h3 className="titlePrimary">Coffe</h3>
        </div>
        <div className="content-cards-list">
          <Row xs={ 1 } sm={ 2 } lg={ 3 }>
            <Col className="mb-3"><Card icon={ <GiCoffeeBeans /> } /></Col>
            <Col className="mb-3"><Card icon={ <GiCoffeeBeans /> } /></Col>
            <Col className="mb-3"><Card icon={ <GiCoffeeBeans /> } /></Col>
          </Row>
        </div>
      </Row>
      <Row className="mb-4">
        <div className="pl__content-card">
          <h3 className="titlePrimary">Cocoa</h3>
        </div>
        <div className="content-cards-list">
          <Row xs={ 1 } sm={ 2 } lg={ 3 }>
            <Col className="mb-3"><Card icon={ <GiCoffeeBeans /> } /></Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default ProductList;
