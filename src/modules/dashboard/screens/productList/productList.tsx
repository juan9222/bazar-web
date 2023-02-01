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
import { isBuyer, isSeller } from "../../layouts/dashboardLayout/utils";
import Modal from "../../../common/components/modal";

const ProductList: React.FC<any> = () => {
  const { basicProducts, productsMap, avatarUrl, onFilterProducts, filteredProducts, onClickProductCard, onLikeProduct, onAddToProductList, onPublish, showConnectWalletDialog, setShowConnectWalletDialog } = useProductList();

  const listsRef = useRef<any[]>([]);

  const handleScroll = async (e: any, index: number, basicProduct: string) => {
    if (listsRef.current[index]) {
      const { scrollLeft, scrollWidth, clientWidth } = listsRef.current[index];
      if (scrollLeft + clientWidth >= scrollWidth - 1) {

        await onAddToProductList(basicProduct);
        listsRef.current[index].scrollLeft = scrollLeft;
      }
    }
  };

  return (
    <Container className="pl">
      <Row>
        <h2 className="titlePrimary">{ isSeller() ? "My Products" : "Products" }</h2>
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
              <div className={ `content-cards-list ${ filteredProducts ? 'selected' : '' }` } onScroll={ e => handleScroll(e, index, basicProduct) } ref={ ref => listsRef.current[index] = ref }>
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
                      onClick={ (e) => onClickProductCard(e, product) }
                      likeable={ isBuyer() }
                      isLiked={ product.is_liked }
                      onLiked={ (e) => onLikeProduct(e, basicProduct, product.uuid, product.is_liked) }
                      onPublish={ (e) => onPublish(e, product) }
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
                      onClick={ (e) => onClickProductCard(e, product) }
                      likeable={ isBuyer() }
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
      { isSeller() && (
        <div className="btn-create-product">
          <NavLink className="btn-create-product__content"
            to="/dashboard/create-product">
            <IconNewProduct />
            <p>New product</p>
          </NavLink>
        </div>
      ) }
      { showConnectWalletDialog && (
        <Modal title="" continueText='Continue' width='560px' closed={ !showConnectWalletDialog } showCloseIcon={ false } cancelHidden={ true } onClose={ () => setShowConnectWalletDialog(false) } onContinue={ () => setShowConnectWalletDialog(false) }>
          <div className="verticalSpaceS"></div>
          <h3 className='textPrimary300 textModalTitle'>Oops, we are sorry !</h3>
          <div className="verticalSpaceL"></div>
          <p className='textModalDesc'>We have noticed that you do not have the wallet extension in your browser or you are not logged in, please install/log in and try again.</p>
        </Modal>
      ) }
    </Container>
  );
};

export default ProductList;
