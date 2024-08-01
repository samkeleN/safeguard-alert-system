import Modal from "react-modal";
import "./Dashboard.css";
import { useState } from "react";

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

  const handleAddContact = () => {
    if (name && contact) {
      setContacts([...contacts, { name, contact }]);
      setName("");
      setContact("");
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>See Contacts</li>
          <li>History</li>
          <li>Sign Out</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 className="Dashboard">Dashboard</h1>
          <h1 className="username">Samkele Ndzululeka</h1>
        </div>
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
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
