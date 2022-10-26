import React from 'react';
import { FaPen, FaUserCircle } from 'react-icons/fa';
import { IProfilePhotoProps } from './interfaces/index';
const ProfilePhoto: React.FC<IProfilePhotoProps> = props => {
  const { fullname } = props;
  return (
    <div className="profilePhoto">
      <div className="profilePhoto__container">
        <FaUserCircle className="profilePhoto__container--imgEmpty" />
        {/* <img src="" alt="" className="profilePhoto__container--img" /> */ }
        <div className="profilePhoto__container--icon">
          <div className="profilePhoto__container--icon--bg">
            <FaPen />
          </div>
        </div>
      </div>
      <div className="profilePhoto__name">{ fullname }</div>
      <div className="profilePhoto__role">Seller</div>
    </div>
  );
};

export default ProfilePhoto;