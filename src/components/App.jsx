import { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Form } from './Form/Form';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  const handleSubmitForm = newContact => {
    contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${contacts.name} is already in contacts`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const handleFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <h1 className={css.formTitle}>Phonebook</h1>
      <Form onSubmit={handleSubmitForm} />
      <div className={css.filterBlock}>
        <h2 className={css.contactTitle}>Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />
      </div>
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </section>
  );
}
