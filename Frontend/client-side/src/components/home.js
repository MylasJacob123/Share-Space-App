import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToDisplay = () => {
    navigate("/display");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero">
          <div className="hero-text">
            <p className="hero-heading">Welcome to Share Space Market</p>
            <p className="hero-description">
              Discover a vibrant community where your creativity thrives.
              Whether you're an artist, anime lover, or a creative entrepreneur,
              our space welcomes all. Share your passions, explore new ideas,
              and join a dynamic marketplace!
            </p>
            <button className="hero-button" onClick={goToDisplay}>
              Explore Now
            </button>
          </div>
          <div className="hero-image"></div>
        </div>

        <section className="about-us">
          <div className="about-us-text">
            <h2>About Us</h2>
            <p>
              At Share Space Market, we provide a platform where artists and
              creatives can showcase their work, collaborate, and grow. Whether
              you want to buy or sell, share your ideas, or discover new talents,
              our marketplace has something for everyone.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://img.freepik.com/free-photo/portrait-anime-character-with-stars_23-2151556342.jpg"
              alt="About Us placeholder"
            />
          </div>
        </section>

        <section className="features">
          <h2>Our Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <img
                src="https://img.freepik.com/fotos-premium/personaje-anime-genial-misterioso-fondo-oscuro_999327-9627.jpg"
                alt="Feature 1"
              />
              <h3>Community Driven</h3>
              <p>
                Join a community that values creativity, collaboration, and
                inclusivity.
              </p>
            </div>
            <div className="feature-card">
              <img
                src="https://img.freepik.com/free-photo/anime-like-illustration-girl-portrait_23-2151835245.jpg"
                alt="Feature 2"
              />
              <h3>Marketplace</h3>
              <p>
                Explore a variety of products from talented creators in
                different genres.
              </p>
            </div>
            <div className="feature-card">
              <img
                src="https://img.freepik.com/free-photo/anime-style-character-space_23-2151134021.jpg"
                alt="Feature 3"
              />
              <h3>Creative Space</h3>
              <p>
                Find the perfect space for your ideas to flourish, with the
                freedom to share and create.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
