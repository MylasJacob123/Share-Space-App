import React from "react";
import "./home.css";
// import Navigation from "./navigation";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToDisplay = () => {
    navigate("/display")
  }

  return (
    <div className="home-container">
      {/* <Navigation /> */}
      <div className="home-content">
        <div className="hero">
          <div>
            <p>
              Welcome to a world where art comes alive and anime dreams are
              shared! Dive into our vibrant community, where your creativity and
              passion for anime find a home. Share, explore, and be inspired!
            </p>
            <button className="hero-button" onClick={goToDisplay}>Explore Now</button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default Home;
