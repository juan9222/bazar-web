import { useRef, useState } from "react";
import { ListGroup, ListGroupItem, Overlay } from 'react-bootstrap';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { MdAttachMoney, MdLogout, MdNotifications, MdPerson } from 'react-icons/md';

const UserMenu = (props: any) => {

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<any>();
  const handleWallet = () => setShowMenu(!showMenu);

  const { authenticatedUser, onLogout } = props;

  return (
    <div className="dshLayout__body--header--user">
      <div ref={ menuRef } onClick={ handleWallet } >
        <img className="dshLayout__body--header--user--icon" src={ authenticatedUser?.profileImage || "/assets/images/default-avatar.png" } alt="card product" />
        <BiDotsVerticalRounded className="dshLayout__body--header--user--icon2" onClick={ () => { } } />
      </div>
      <Overlay rootClose onHide={ handleWallet } transition={ false } target={ menuRef.current } show={ showMenu } placement="bottom-end">
        { (props) => (
          <div
            { ...props }
            className="dshLayout__body--header--user--dropdown"
          >
            <div className="dshLayout__body--header--user--dropdown--profile">
              <img className="dshLayout__body--header--user--dropdown--profile--image" src={ authenticatedUser?.profileImage || "/assets/images/default-avatar.png" } alt="card product" />
              <span className="dshLayout__body--header--user--dropdown--profile--username">
                { authenticatedUser?.firstName && authenticatedUser?.lastName ? `${ authenticatedUser?.firstName } ${ authenticatedUser?.lastName }` : 'User Name' }
              </span>
              <span className="dshLayout__body--header--user--dropdown--profile--role">{ authenticatedUser?.role || 'seller' }</span>
            </div>
            <div className="dshLayout__body--header--user--dropdown--listMenu">
              <ListGroup variant="flush">
                <ListGroupItem action onClick={ () => { } } className="dshLayout__body--header--user--dropdown--listMenu--item">
                  <MdPerson className="dshLayout__body--header--user--dropdown--listMenu--item--icon" /> <span className="dshLayout__body--header--user--dropdown--listMenu--item--label" >Profile</span>
                </ListGroupItem>
                <ListGroupItem action onClick={ () => { } } className="dshLayout__body--header--user--dropdown--listMenu--item">
                  <MdNotifications className="dshLayout__body--header--user--dropdown--listMenu--item--icon" /> <span className="dshLayout__body--header--user--dropdown--listMenu--item--label" >Notification</span>
                </ListGroupItem>
                <ListGroupItem action onClick={ () => { } } className="dshLayout__body--header--user--dropdown--listMenu--item">
                  <MdAttachMoney className="dshLayout__body--header--user--dropdown--listMenu--item--icon" /> <span className="dshLayout__body--header--user--dropdown--listMenu--item--label" >Change currency</span>
                </ListGroupItem>
                <ListGroupItem action onClick={ () => { window.location.replace(`https://www.bazar.network/creation-user-seller`); } } className="dshLayout__body--header--user--dropdown--listMenu--item">
                  <BsFillBookmarkStarFill className="dshLayout__body--header--user--dropdown--listMenu--item--icon" /> <span className="dshLayout__body--header--user--dropdown--listMenu--item--label" >User Guides</span>
                </ListGroupItem>
                <ListGroupItem action onClick={ onLogout } className="dshLayout__body--header--user--dropdown--listMenu--item divider">
                  <MdLogout className="dshLayout__body--header--user--dropdown--listMenu--item--icon" /> <span className="dshLayout__body--header--user--dropdown--listMenu--item--label" >Log out</span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        ) }
      </Overlay>
    </div >
  );
};

export default UserMenu;