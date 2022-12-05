import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserTag, FaUserTie, FaTruckMoving } from "react-icons/fa";
import { BiSlider } from 'react-icons/bi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import UnknownAvatar from "../../../../assets/svg/icons/unknownAvatar";
import Modal from "../../../common/components/modal";

const UserApprovals: React.FC<any> = () => {
  const [manageUserModal, setManageUserModal] = useState(false);
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
          <Table responsive>
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
              <Row className="userApprovals__tableRow">
                <Col xs={ 3 }><UnknownAvatar />Hector Hernandez</Col>
                <Col xs={ 2 }>Seller</Col>
                <Col xs={ 3 }>Cafeto Software</Col>
                <Col xs={ 2 }><div className="userApprovals__review">Review</div></Col>
                <Col className="userApprovals__viewDetail" xs={ 2 }><div onClick={ () => setManageUserModal(true) }>Manage User</div></Col>
              </Row>
              <hr className="m-0" />
              <Row className="userApprovals__tableRow">
                <Col xs={ 3 }><UnknownAvatar />Angela Tafur</Col>
                <Col xs={ 2 }>Buyer</Col>
                <Col xs={ 3 }>Cafe cafe</Col>
                <Col xs={ 2 }><div className="userApprovals__inProcess">In Process</div></Col>
                <Col className="userApprovals__viewDetail" xs={ 2 }><div onClick={ () => setManageUserModal(true) }>Manage User</div></Col>
              </Row>
              <hr className="m-0" />
              <Row className="userApprovals__tableRow">
                <Col xs={ 3 }><UnknownAvatar />Pablo Pérez</Col>
                <Col xs={ 2 }>Seller</Col>
                <Col xs={ 3 }>Mi Tierra</Col>
                <Col xs={ 2 }><div className="userApprovals__approved">Approved</div></Col>
                <Col className="userApprovals__viewDetail" xs={ 2 }><div onClick={ () => setManageUserModal(true) }>Manage User</div></Col>
              </Row>
              <hr className="m-0" />
              <Row className="userApprovals__tableRow">
                <Col xs={ 3 }><UnknownAvatar />Angie Osorio</Col>
                <Col xs={ 2 }>Seller</Col>
                <Col xs={ 3 }>Coffee Lab</Col>
                <Col xs={ 2 }><div className="userApprovals__rejected">Rejected</div></Col>
                <Col className="userApprovals__viewDetail" xs={ 2 }><div onClick={ () => setManageUserModal(true) }>Manage User</div></Col>
              </Row>
              <hr className="m-0" />
            </Row>
          </Table>
        </Row>
        {/* Card Row */ }
        <Col className="d-lg-none d-block">
          <Row className="shadow-sm rounded-lg px-3 my-3 border-box userApprovals__cardBody">
            <Col className="border-box">
              <Row className="d-flex align-items-center" xs={ 12 }>
                <Col className="p-0" xs={ 2 } sm={ 2 } md={ 1 }>
                  <UnknownAvatar className="p-0" />
                </Col>
                <Col className="p-0">
                  <p className="p-0 mb-0"> Hector Hernandez</p>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>Profile</Col>
                <Col className="text-end">Seller</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Company</Col>
                <Col className="text-end">Cafeto Software</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Status</Col>
                <Col className="d-flex justify-content-end">
                  <div className="userApprovals__review">Review</div>
                </Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="userApprovals__viewDetail py-2">
                <Col className="d-flex justify-content-end">
                  <div onClick={ () => setManageUserModal(true) }>Manage User</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="shadow-sm rounded-lg px-3 my-3 border-box userApprovals__cardBody">
            <Col className="border-box">
              <Row className="d-flex align-items-center" xs={ 12 }>
                <Col className="p-0" xs={ 2 } sm={ 2 } md={ 1 }>
                  <UnknownAvatar className="p-0" />
                </Col>
                <Col className="p-0">
                  <p className="p-0 mb-0">Angela Tafur</p>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>Profile</Col>
                <Col className="text-end">Buyer</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Company</Col>
                <Col className="text-end">Cafe cafe</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Status</Col>
                <Col className="d-flex justify-content-end">
                  <div className="userApprovals__inProcess">In Process</div>
                </Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="userApprovals__viewDetail py-2">
                <Col className="d-flex justify-content-end">
                  <div onClick={ () => setManageUserModal(true) }>Manage User</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="shadow-sm rounded-lg px-3 my-3 border-box userApprovals__cardBody">
            <Col className="border-box">
              <Row className="d-flex align-items-center" xs={ 12 }>
                <Col className="p-0" xs={ 2 } sm={ 2 } md={ 1 }>
                  <UnknownAvatar className="p-0" />
                </Col>
                <Col className="p-0">
                  <p className="p-0 mb-0">Pablo Pérez</p>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>Profile</Col>
                <Col className="text-end">Seller</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Company</Col>
                <Col className="text-end">Mi Tierra</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Status</Col>
                <Col className="d-flex justify-content-end">
                  <div className="userApprovals__approved">Approved</div>
                </Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="userApprovals__viewDetail py-2">
                <Col className="d-flex justify-content-end">
                  <div onClick={ () => setManageUserModal(true) }>Manage User</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="shadow-sm rounded-lg px-3 my-3 border-box userApprovals__cardBody">
            <Col className="border-box">
              <Row className="d-flex align-items-center" xs={ 12 }>
                <Col className="p-0" xs={ 2 } sm={ 2 } md={ 1 }>
                  <UnknownAvatar className="p-0" />
                </Col>
                <Col className="p-0">
                  <p className="p-0 mb-0">Angie Osorio</p>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>Profile</Col>
                <Col className="text-end">Seller</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Company</Col>
                <Col className="text-end">Coffee Lab</Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="py-2">
                <Col>Status</Col>
                <Col className="d-flex justify-content-end">
                  <div className="userApprovals__rejected">Rejected</div>
                </Col>
              </Row>
              <hr className="m-0 mw-100 w-100" />
              <Row className="userApprovals__viewDetail py-2">
                <Col className="d-flex justify-content-end">
                  <div onClick={ () => setManageUserModal(true) }>Manage User</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/* Pagination Row */ }
        <div className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Item active>{ 1 }</Pagination.Item>
            <Pagination.Item >{ 2 }</Pagination.Item>
            <Pagination.Item >{ 3 }</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{ 6 }</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </Container>
      { manageUserModal &&
        <Modal title="Manage User" width='541px' continueText="Save" closed={ !manageUserModal } cancelHidden={ true } showCloseIcon onClose={ () => setManageUserModal(false) }>
          <div className="userApprovals__paragraphText">
            <p className="userApprovals__colorNeutral"><span className="userApprovals__colorRed">*</span> Select what you want to Manage</p>
            <div className="userApprovals__manageUserSubtitle">User</div>
            <hr className="w-100 mt-0" />
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex gap-4">
                <div className="userApprovals__userAttribute">Profile</div>
                <div className="userApprovals__reviewModal">Review</div>
              </div>
              <div className="userApprovals__ellipsis">...</div>
            </div>
            <div className="userApprovals__manageUserSubtitle">Products</div>
            <hr className="w-100 mt-0" />
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex gap-4">
                <div className="userApprovals__userAttribute">Coffee</div>
                <div className="userApprovals__reviewModal">Review</div>
              </div>
              <div className="userApprovals__ellipsis">...</div>
            </div>
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex gap-4">
                <div className="userApprovals__userAttribute">Cocoa</div>
                <div className="userApprovals__reviewModal">Review</div>
              </div>
              <div className="userApprovals__ellipsis">...</div>
            </div>
            <div className="userApprovals__additionalCommentsTitle">Additional Comments</div>
            <textarea placeholder="write additional comments" className="userApprovals__textArea" />
          </div>
        </Modal>
      }
    </>
  );
};

export default UserApprovals;