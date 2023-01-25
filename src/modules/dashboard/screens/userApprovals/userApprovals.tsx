import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserTag, FaUserTie, FaTruckMoving } from "react-icons/fa";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BiSlider } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import UnknownAvatar from "../../../../assets/svg/icons/unknownAvatar";
import Modal from "../../../common/components/modal";
import useProductList from "./hooks/useUserApprovals";


const UserApprovals: React.FC<any> = () => {
  const { register, handleSubmit, userList, pages, activePage, showManageUserModal, onCloseManageUserModal, onOpenManageUser, selectedUser, onChangeUserStatus, productsMap, onChangeProductStatus, statusToClassFormatter, onSave, setActivePage, enableSave } = useProductList();

  const pagination = () => {
    const pageItems = [];
    for (let index = 0; index < pages; index++) {
      pageItems.push(
        <Pagination.Item key={ index } active={ index === activePage } onClick={ () => setActivePage(index) }>{ index + 1 }</Pagination.Item>
      );
    }
    return pageItems;
  };

  return (
    <>
      <Container fluid>
        {/* Title and  Search Row */ }
        <Row>
          <Col className="userApprovals__filters">
            {/* Title */ }
            <Row>
              <p className="userApprovals__userTitle">Network Participants</p>
            </Row>
            {/* Searchbar */ }
            <Row>
              <Col xs={ 10 } md={ 11 } lg={ 5 } >
                <InputGroup>
                  <InputGroup.Text className="userApprovals__searchIconBackground">
                    <AiOutlineSearch className="userApprovals__searchIcon" />
                  </InputGroup.Text>
                  <Form.Control
                    className="userApprovals__searchInputBackground"
                    placeholder="Search User"
                  />
                </InputGroup>
              </Col>
              {/* Filter Button */ }
              <Col xs={ 2 } md={ 1 } lg={ 1 }>
                <Button className="userApprovals__filterButton">
                  <BiSlider className="userApprovals__filterIcon" />
                </Button>
              </Col>
              {/* Filters */ }
              <Col xs={ 12 } md={ 12 } lg={ 5 } className="userApprovals__specificFilters mt-lg-0 mt-md-2 mt-2 mt-sm-2 ">
                <Button className="userApprovals__seller">
                  <FaUserTag className="userApprovals__sellerIcon" />
                  Seller
                </Button>
                <Button className="userApprovals__buyer">
                  <FaUserTie className="userApprovals__buyerIcon" />
                  Buyer
                </Button>
                <Button className="userApprovals__forwarders">
                  <FaTruckMoving className="userApprovals__forwardersIcon" />
                  Forwarders
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Table Row */ }
        <Row className="d-lg-block d-none">
          <div className="mb-4">
            {/* Table Head */ }
            <Row className="userApprovals__tableHead">
              <Col xs={ 3 } className="userApprovals__tableHeadName">
                Name
                <BsFillCaretDownFill className="userApprovals__downIcon" />
              </Col>
              <Col xs={ 2 } className="p-0">Profile</Col>
              <Col xs={ 3 } className="p-0">Company</Col>
              <Col xs={ 2 } className="p-0">Status</Col>
              <Col xs={ 2 } className="p-0"></Col>
            </Row>
            {/* Table Body */ }
            <Row xs={ 12 } className="userApprovals__tableBody">
              { userList.map((user: any) => {
                return <>
                  <Row key={ user.id } className="userApprovals__tableRow">
                    <Col xs={ 3 }><UnknownAvatar />{ user.userName }</Col>
                    <Col xs={ 2 }>{ user.profile }</Col>
                    <Col xs={ 3 }>{ user.companyName }</Col>
                    <Col xs={ 2 }><div className={ statusToClassFormatter(user.status) }>{ user.status }</div></Col>
                    <Col className="userApprovals__viewDetail" xs={ 2 }><div className="cursor-pointer" onClick={ () => onOpenManageUser(user) }>Manage User</div></Col>
                  </Row>
                  <hr className="m-0" />
                </>;
              }) }
            </Row>
          </div>
        </Row>
        {/* Card Row */ }
        <Col className="d-lg-none d-block">
          { userList.map((user: any) => {
            return <>
              <Row key={ user.id } className="shadow-sm rounded-lg px-3 my-3 border-box userApprovals__cardBody">
                <Col className="border-box">
                  <Row className="d-flex align-items-center" xs={ 12 }>
                    <Col className="p-0" xs={ 2 } sm={ 2 } md={ 1 }>
                      <UnknownAvatar className="p-0" />
                    </Col>
                    <Col className="p-0">
                      <p className="p-0 mb-0">{ user.userName }r</p>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col>Profile</Col>
                    <Col className="text-end">{ user.profile }</Col>
                  </Row>
                  <hr className="m-0 mw-100 w-100" />
                  <Row className="py-2">
                    <Col>Company</Col>
                    <Col className="text-end">{ user.companyName }</Col>
                  </Row>
                  <hr className="m-0 mw-100 w-100" />
                  <Row className="py-2">
                    <Col>Status</Col>
                    <Col className="d-flex justify-content-end">
                      <div className={ statusToClassFormatter(user.status) }>{ user.status }</div>
                    </Col>
                  </Row>
                  <hr className="m-0 mw-100 w-100" />
                  <Row className="userApprovals__viewDetail py-2">
                    <Col className="d-flex justify-content-end">
                      <div className="cursor-pointer" onClick={ () => onOpenManageUser(user) }>Manage User</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>;
          }) }
        </Col>
        {/* Pagination Row */ }
        <div className="d-flex justify-content-end">
          <Pagination >
            { pagination() }
          </Pagination>
        </div>
      </Container>
      <Modal title="Manage User" width='541px' height='43rem' continueText="Save" closed={ !showManageUserModal } cancelHidden={ true } showCloseIcon onClose={ onCloseManageUserModal } onContinue={ handleSubmit(onSave) } continueDisabled={ !enableSave }>
        <div className="userApprovals__paragraphText">
          <p className="userApprovals__colorNeutral"><span className="userApprovals__colorRed">*</span> Select what you want to Manage</p>
          <div className="userApprovals__manageUserSubtitle">User</div>
          <hr className="w-100 mt-0" />
          <div className="d-flex align-items-center justify-content-between px-4 py-3">
            <div className="d-flex gap-4">
              <div className="userApprovals__userAttribute">Profile</div>
              <div className={ statusToClassFormatter(selectedUser?.status) }>{ selectedUser?.status }</div>
            </div>
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover id="popover-positioned-bottom">
                  <Popover.Body>
                    <ul className="userApprovals__list">
                      <li className="userApprovals__approve" onClick={ () => { onChangeUserStatus("Approved"); } }><AiFillCheckCircle /> Approve</li>
                      <li className="userApprovals__reject" onClick={ () => { onChangeUserStatus("Rejected"); } }><AiFillCloseCircle /> Reject</li>
                    </ul>
                  </Popover.Body>
                </Popover>
              }
              rootClose
            >
              <div className="userApprovals__ellipsis">...</div>
            </OverlayTrigger>
          </div>
          <div className="userApprovals__manageUserSubtitle">Products</div>
          <hr className="w-100 mt-0" />
          <div className="overflow-scroll userApprovals__productList" style={ { height: "12rem" } }>
            { (productsMap && Object.keys(productsMap).length > 0) ? Object.keys(productsMap).map((productUuid: string) => {
              return <div className="d-flex align-items-center justify-content-between px-4 py-3">
                <div className="d-flex gap-4">
                  <div className="userApprovals__userAttribute">{ productsMap[productUuid].name }</div>
                  <div className={ statusToClassFormatter(productsMap[productUuid].status) }>{ productsMap[productUuid].status }</div>
                </div>
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-bottom">
                      <Popover.Body>
                        <ul className="userApprovals__list">
                          <li className="userApprovals__approve" onClick={ () => { onChangeProductStatus(productUuid, "Approved"); } }><AiFillCheckCircle /> Approve</li>
                          <li className="userApprovals__reject" onClick={ () => { onChangeProductStatus(productUuid, "Rejected"); } }><AiFillCloseCircle /> Reject</li>
                        </ul>
                      </Popover.Body>
                    </Popover>
                  }
                  rootClose
                >
                  <div className="userApprovals__ellipsis">...</div>
                </OverlayTrigger>
              </div>;
            }
            )
              :
              <div className="userApprovals__noproducts">
                <img src="/assets/images/no-products.png" alt="no-products" />
                <p>No products yet</p>
              </div>
            }
          </div>
          <div className="userApprovals__additionalCommentsTitle">Additional Comments</div>
          <textarea placeholder="write additional comments" className="userApprovals__textArea" { ...register("additionalComments") } />
        </div >
      </Modal >
    </>
  );
};

export default UserApprovals;