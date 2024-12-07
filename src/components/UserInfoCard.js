// UserInfoCard.js
const UserInfoCard = ({ userData }) => {
  return (
    <div className="card">
      <h2>User Info</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserInfoCard;