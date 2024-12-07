import React from 'react';

const UserInfoCard = ({ userData }) => {
  // Random Profile Picture URL (you can replace this with an actual user image if available)
  const randomProfilePic = `https://th.bing.com/th/id/R.4d78c2510a48540ba4e767396cbea22e?rik=M3qf2IPZemZ2nA&pid=ImgRaw&r=0`;

  return (
    <div className='user-page'>
    <div className="user-info-card">
      <div className="user-info-card__content">
        <div className="user-info-card__info">
          <p className="user-info-card__label">Username:</p>
          <p className="user-info-card__data">{userData.username}</p>
          <p className="user-info-card__label">Email:</p>
          <p className="user-info-card__data">{userData.email}</p>
        </div>
        <div className="user-info-card__profile">
          <img
            className="user-info-card__profile-pic"
            src={randomProfilePic}
            alt="Profile"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserInfoCard;
