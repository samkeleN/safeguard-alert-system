import { useState } from "react";
import { db } from "../../../Firebase"; // Assuming Firebase is configured in this file
import { uid } from "uid";
import { ref, set } from "firebase/database";

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

  const writeToDatabase = (name: string, contact: string) => {
    const uuid = uid(); // Unique identifier for each contact
    set(ref(db, `/contacts/${uuid}`), {
      name,
      contact,
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

    // Write to Firebase Database
    writeToDatabase(name, contact);

    // Clear inputs and error
    onAddContact(name, contact);
    setName("");
    setContact("");
    setError(""); // Clear error message
    onClose(); // Close modal after adding
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
