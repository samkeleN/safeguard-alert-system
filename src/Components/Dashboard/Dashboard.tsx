import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Dashboard.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase auth methods
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

interface Contact {
  name: string;
  contact: string;
}

Modal.setAppElement("#root");

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("contacts");
  const [error, setError] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  const navigate = useNavigate(); // For navigating to home after sign-out

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the user's email when signed in
      } else {
        setUserEmail(null); // Clear email if no user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
  const isValidContact = (contact: string) => /^\d{10}$/.test(contact);

  const handleAddContact = () => {
    if (contacts.length >= 2) {
      setError("You can only add up to 2 contacts.");
      return;
    }

    if (!isValidName(name)) {
      setError("Name must contain only characters.");
      return;
    }

    if (!isValidContact(contact)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    if (contacts.some((c) => c.name === name)) {
      setError("Contact name already exists.");
      return;
    }

    if (contacts.some((c) => c.contact === contact)) {
      setError("Contact number already exists.");
      return;
    }

    setContacts([...contacts, { name, contact }]);
    setName("");
    setContact("");
    setIsModalOpen(false);
    setError(""); // Clear error message
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(""); // Clear error message when closing the modal
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to home after sign out
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "contacts":
        return (
          <div>
            <div className="addcontacts">
              <h1 className="contacts">Contacts</h1>
              <button className="add" onClick={handleOpenModal}>
                Add
              </button>
            </div>
            <div className="contact-list">
              <h2 className="lists">List of added Contacts</h2>
              {contacts.map((contact, index) => (
                <div key={index} className="contact-item">
                  <p>Name: {contact.name}</p>
                  <p>Contact: {contact.contact}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "history":
        return (
          <div>
            <h2>History</h2>
            <p>No history available.</p>
          </div>
        );
      case "signout":
        return (
          <div>
            <h2>Sign Out Page</h2>
            <p>You have been signed out.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li
            className={activePage === "contacts" ? "active" : ""}
            onClick={() => handlePageChange("contacts")}
          >
            See Contacts
          </li>
          <li
            className={activePage === "history" ? "active" : ""}
            onClick={() => handlePageChange("history")}
          >
            History
          </li>
          <li
            className={activePage === "signout" ? "active" : ""}
            onClick={handleSignOut} // Call handleSignOut on click
          >
            Sign Out
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 className="Dashboard"></h1>
          <h1 className="username">{userEmail ? userEmail : "No user"}</h1> {/* Show user's email */}
        </div>
        {renderPageContent()}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Add Contact</h2>
          <div className="contact-form">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button className="addcontact" onClick={handleAddContact}>
              Add Contact
            </button>
            <button className="close" onClick={handleCloseModal}>
              Close
            </button>
            {error && <p className="error">{error}</p>}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
