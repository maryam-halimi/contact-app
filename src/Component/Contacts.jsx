// Contacts.js
import React, { useState } from 'react';
import { v4 } from 'uuid';
import ContactsList from './ContactsList';
import styles from './Contacts.module.css'

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState('');
  const [contact, setContact] = useState({
    id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      setAlert('Please enter valid data!');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact.email)) {
      setAlert('Invalid email format!');
      return;
    }
    setAlert('');
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: '',
      lastName: '',
      email: '',
      phone: '',
    });
    setIsEdit(false);
  };

  const editHandler = (contact) => {
    setIsEdit(true);
    setEditContactId(contact.id);
    setContact(contact);
  };

  const saveEditHandler = () => {
    const newContacts = contacts.map((item) => {
      if (item.id === editContactId) {
        return contact;
      }
      return item;
    });
    setContacts(newContacts);
    setIsEdit(false);
    setContact({
      name: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  const deleteHandler = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  };

  const deleteSelectedHandler = () => {
    setContacts((contacts) =>
      contacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  const selectContactHandler = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts((selectedContacts) =>
        selectedContacts.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedContacts((selectedContacts) => [...selectedContacts, id]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={contact.name}
          onChange={changeHandler}
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={contact.lastName}
          onChange={changeHandler}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={contact.email}
          onChange={changeHandler}
        />

        <input
          type="number"
          placeholder="Phone"
          name="phone"
          value={contact.phone}
          onChange={changeHandler}
        />

        {isEdit ? (
          <button onClick={saveEditHandler}>Save Edit</button>
        ) : (
          <button onClick={addHandler}>Add Contact</button>
        )}
      </div>
      <div  className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactsList
        contacts={contacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        selectContactHandler={selectContactHandler}
        selectedContacts={selectedContacts}
      />
      {selectedContacts.length > 0 && (
        <button onClick={deleteSelectedHandler}>Delete Selected</button>
      )}
    </div>
  );
}

export default Contacts;