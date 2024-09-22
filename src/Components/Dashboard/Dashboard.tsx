import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Dashboard.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase auth methods
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { ref, onValue } from "firebase/database"; // Import Firebase database methods
import { db } from "../../../Firebase"; // Import Firebase configuration
import ContactForm from "./Contacts"; // Import the ContactForm component

interface Contact {
  name: string;
  contact: string;
}

Modal.setAppElement("#root");

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("contacts");
  const [error, setError] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  const navigate = useNavigate(); // For navigating to home after sign-out

  // Firebase Authentication listener for user login state
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

  // Firebase Database listener to read contacts
  useEffect(() => {
    const contactRef = ref(db, "/contacts"); // Firebase database reference to the contacts
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.values(data) as Contact[]; // Convert the object to an array of contacts
        setContacts(contactList); // Update the contacts state
      }
    });
  }, []); // This will run once on component mount

  // Function to handle adding a new contact (locally, since we are reading from Firebase)
  const handleAddContact = (name: string, contact: string) => {
    if (contacts.length >= 2) {
      setError("You can only add up to 2 contacts.");
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
          <ContactForm
            onAddContact={handleAddContact}
            onClose={handleCloseModal}
            error={error}
            setError={setError}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
