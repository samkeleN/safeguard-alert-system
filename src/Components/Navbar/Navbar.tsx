import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo-white.jpg";
import logo_dark from "../../assets/logo-white.jpg";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path === "/" ? "home" : path.substring(1));
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="navbar">
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />
      <h2 className="topic">SafeGuard Alert System</h2>
      <ul className="nav-links">
        <li>
          <a
            href="/"
            className={activeLink === "home" ? "active" : ""}
            onClick={() => {
              handleLinkClick("home");
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className={activeLink === "about" ? "active" : ""}
            onClick={() => handleLinkClick("about")}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className={activeLink === "contact" ? "active" : ""}
            onClick={() => handleLinkClick("contact")}
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href="/dashboard"
            className={activeLink === "dashboard" ? "active" : ""}
            onClick={() => handleLinkClick("dashboard")}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/signup"
            className={activeLink === "signup" ? "active" : ""}
            onClick={() => handleLinkClick("signup")}
          >
            Sign Up
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;