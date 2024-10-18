import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Dashboard.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, onValue, push, remove, set } from "firebase/database"; // Use push to create unique keys
import { db } from "../../../Firebase";
import ContactForm from "./Contacts";

interface Contact {
  id: string;
  name: string;
  contact: number; // Changed to number
  user: string;
}

Modal.setAppElement("#root");

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("contacts");
  const [error, setError] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null); // Added to track user UID

  const navigate = useNavigate();

  // Track authenticated user and their UID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUid(user.uid); // Get UID of authenticated user
      } else {
        setUserEmail(null);
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch contacts for the logged-in user
  useEffect(() => {
    if (!uid) return; // Ensure there's a valid user UID

    const contactRef = ref(db, `${uid}/NextOfKin`); // Use UID-based path for fetching contacts
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList: Contact[] = Object.entries(data).map(([id, contact]) => {
          const typedContact = contact as Contact;
          return {
            id,
            name: typedContact.name,
            contact: typedContact.contact,
            user: typedContact.user,
          };
        });

        setContacts(contactList);
      }
    });
  }, [uid]);

  // Add contact and store it in Firebase under /uid/NextOfKin
  const handleAddContact = (name: string, contact: string) => {
    if (contacts.length >= 2) {
      setError("You can only add up to 2 contacts.");
      return;
    }

    if (uid) {
      const newContactRef = push(ref(db, `${uid}/NextOfKin`)); // Use UID-based path
      const contactNumber = parseInt(contact); // Ensure the contact is an integer

      const newContact = {
        name,
        contact: contactNumber, // Save contact as an integer
        user: userEmail || "",
      };

      set(newContactRef, newContact).catch((error: any) => {
        console.error("Error adding contact: ", error);
      }); // Write to Firebase
    }

    setIsModalOpen(false);
    setError("");
  };

// Delete contact from Firebase and remove from UI
const handleDeleteContact = (id: string) => {
  if (uid) {
    const contactRef = ref(db, `${uid}/NextOfKin/${id}`); // Use UID-based path

    remove(contactRef)
      .then(() => {
        // Remove contact from the local state
        setContacts(contacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting contact: ", error);
        setError("Failed to delete contact. Please try again.");
      });
  }
};


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
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
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-item">
                  <p>Name: {contact.name}</p>
                  <p>Contact: {contact.contact}</p>
                  <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
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
            onClick={handleSignOut}
          >
            Sign Out
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 className="Dashboard"></h1>
          <h1 className="username">{userEmail ? userEmail : "No user"}</h1>
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
