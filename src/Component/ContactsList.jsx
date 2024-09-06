import React, { useState } from 'react';
import Contacts from './Contacts';
import ContactItem from './ContactItem';
import styles from './ContactsList.module.css';

function ContactsList({ contacts, deleteHandler, editHandler }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

const handleSearchTermChange = (e) => {
  const searchTermValue = e.target.value.trim();
  if (searchTermValue === '') {
    setSearchError('Please enter a search term');
    const timeoutId = setTimeout(() => {
      setSearchError(null);
    }, 2000); // clear error message after 2 seconds
    setTimeoutId(timeoutId);
  } else if (!/\S+@\S+\.\S+/.test(searchTermValue)) {
    setSearchError('Invalid email format');
    const timeoutId = setTimeout(() => {
      setSearchError(null);
    }, 2000); // clear error message after 2 seconds
    setTimeoutId(timeoutId);
  } else {
    setSearchError(null);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  setSearchTerm(searchTermValue);
};
    const filteredContacts = contacts.filter((contact) => {
    const nameMatch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const lastNameMatch = contact.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || lastNameMatch || emailMatch;
  });

  return (
    <div className={styles.container}>
      <h3>contacts list</h3>
      
      <input
        className={styles.search}
        type="search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search by name, last name, or email"
      />
      {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
      <ul  className={styles.Contacts}>
        {filteredContacts.length ? (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))
        ) : (
          <p  className={styles.message} >no contact yet!</p>
        )}
      </ul>
    </div>
  );
}

export default ContactsList;