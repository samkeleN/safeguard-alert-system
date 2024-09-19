import React, { useState, useEffect } from "react";
import "./Navbar.css";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path === "/" ? "home" : path.substring(1));
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu on link click
  };

  return (
    <div className="navbar">
      <h2 className="topic">SafeGuard Alert System</h2>
      <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#x2630; {/* Hamburger icon */}
      </button>
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a
            href="/"
            className={activeLink === "home" ? "active" : ""}
            onClick={() => handleLinkClick("home")}
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
