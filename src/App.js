import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/contacts');
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <ContactForm fetchContacts={fetchContacts} />
      <ContactsTable contacts={contacts} fetchContacts={fetchContacts} />
    </div>
  );
};

export default App;
