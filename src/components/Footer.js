import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Handle button click to navigate to the dashboard
  const handleJoinNowClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="footer-container">
      {/* Background Video */}
      <video autoPlay loop muted className="footer-video">
        <source src="https://videos.pexels.com/video-files/7172188/7172188-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text and Button */}
      <div className="footer-content">
        <p className="footer-text">Become a part of the MealMeet community — add your own recipe and let others savor your creations!</p>
        <button className="join-now-btn" onClick={handleJoinNowClick}>Join Now</button>
      </div>
    </div>
  );
};

export default Footer;
