import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./navigation.css";

function Navigation({ cartItems = [] }) {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false);

    switch (item) {
      case 'Home':
        navigate('/');
        break;
      case 'Display':
        navigate('/display');
        break;
      case 'Sign Up':
        navigate('/signUp');
        break;
      case 'Sign In':
        navigate('/signIn');
        break;
      case 'Cart':
        navigate('/userItems');
        break;
      default:
        break;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
      <div className="nav-logo">
        <h1>LOGO</h1>
      </div>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <ul>
        <li
          className={activeItem === 'Home' ? 'active' : ''}
          onClick={() => handleMenuClick('Home')}
        >
          Home
        </li>
        <li
          className={activeItem === 'Display' ? 'active' : ''}
          onClick={() => handleMenuClick('Display')}
        >
          Display
        </li>
        <li
          className={activeItem === 'Sign Up' ? 'active' : ''}
          onClick={() => handleMenuClick('Sign Up')}
        >
          Sign Up
        </li>
        <li
          className={activeItem === 'Sign In' ? 'active' : ''}
          onClick={() => handleMenuClick('Sign In')}
        >
          Sign In
        </li>
        <li
          className={activeItem === 'Cart' ? 'active' : ''}
          onClick={() => handleMenuClick('Cart')}
        >
          <span className="cart-icon">
            🛒
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
