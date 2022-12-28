import React from 'react';
import { FaPen, FaUserCircle } from 'react-icons/fa';
import { IProfilePhotoProps } from './interfaces/index';
const ProfilePhoto: React.FC<IProfilePhotoProps> = props => {
  const { fullname, role, onPressEdit, onlyPhoto, url, selected, onSelectAvatar, avatar } = props;
  return (
    <div className="profilePhoto">
      <div onClick={ () => onSelectAvatar && onSelectAvatar(avatar) } className={ selected ? "profilePhoto__container profilePhoto__selected" : "profilePhoto__container" }>
        { url ? (
          <img className="profilePhoto__container--img" src={ url } alt={ fullname } />
        ) : (
          <FaUserCircle className="profilePhoto__container--imgEmpty" />
        ) }
        {/* <img src="" alt="" className="profilePhoto__container--img" /> */ }
        { !onlyPhoto && <div className="profilePhoto__container--icon">
          <div onClick={ onPressEdit } className="profilePhoto__container--icon--bg">
            <FaPen />
          </div>
        </div> }
      </div>
      { !onlyPhoto &&
        <>
          <div className="profilePhoto__name">{ fullname }</div>
          <div className="profilePhoto__role">{ role }</div>
        </> }
    </div>
  );
};

export default ProfilePhoto;