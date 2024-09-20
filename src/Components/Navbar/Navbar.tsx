import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth functions

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth(); // Get Firebase Auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check if user is signed in or not
      if (user) {
        setIsAuthenticated(true); // User is signed in
      } else {
        setIsAuthenticated(false); // No user is signed in
      }
    });

    const path = window.location.pathname;
    setActiveLink(path === "/" ? "home" : path.substring(1));

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
        {isAuthenticated && ( // Conditionally render the Dashboard link if the user is authenticated
          <li>
            <a
              href="/dashboard"
              className={activeLink === "dashboard" ? "active" : ""}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </a>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <a
              href="/signup"
              className={activeLink === "signup" ? "active" : ""}
              onClick={() => handleLinkClick("signup")}
            >
              Sign Up
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
