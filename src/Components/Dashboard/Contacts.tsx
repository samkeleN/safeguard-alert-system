import { useState, useEffect } from "react";
import { db } from "../../../Firebase"; // Assuming Firebase is configured in this file
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { getAuth, User } from "firebase/auth"; // Import Firebase auth
import "./Contacts.css";

interface ContactFormProps {
  onAddContact: (name: string, contact: string) => void;
  onClose: () => void;
  error: string;
  setError: (message: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onAddContact,
  onClose,
  error,
  setError,
}) => {
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Get the currently authenticated user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user); // Set the current user if authenticated
      } else {
        setCurrentUser(null); // Clear the user if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const writeToDatabase = (name: string, contact: string) => {
    const uuid = uid(); // Unique identifier for each contact
    set(ref(db, `/contacts/${uuid}`), {
      name,
      contact,
      user: currentUser?.email, // Store the user's email along with contact
    });
  };

  const isValidName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
  const isValidContact = (contact: string) => /^\d{10}$/.test(contact);

  const handleAddContact = () => {
    if (!isValidName(name)) {
      setError("Name must contain only letters.");
      return;
    }

    if (!isValidContact(contact)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    // Check if the user is authenticated
    if (currentUser) {
      // Write to Firebase Database for authorized users
      writeToDatabase(name, contact);

      // Clear inputs and error
      onAddContact(name, contact);
      setName("");
      setContact("");
      setError(""); // Clear error message
      onClose(); // Close modal after adding
    } else {
      setError("You are not authorized to add contacts.");
    }
  };

  return (
    <div className="contact-form">
      <h2>Add Contact</h2>
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
        maxLength={10}
      />
      <button className="addcontact" onClick={handleAddContact}>
        Add Contact
      </button>
      <button className="close" onClick={onClose}>
        Close
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ContactForm;
