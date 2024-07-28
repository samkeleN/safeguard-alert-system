import React from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo-white.jpg";
import logo_dark from "../../assets/logo-white.jpg";
// import toggle_light from "../../assets/night.png";
// import toggle_dark from "../../assets/day.png";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  // const toggleMode = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  return (
    <div className="navbar">
      <img src={theme === 'light' ? logo_light : logo_dark} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>

      {/* Toggle light mode and dark mode */}
      {/* <img
        onClick={toggleMode}
        src={theme === 'light' ? toggle_light : toggle_dark}
        alt="Toggle Icon"
        className="toggle-icon"
      /> */}
    </div>
  );
};

export default Navbar;
