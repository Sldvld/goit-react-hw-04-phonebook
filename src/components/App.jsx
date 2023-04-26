import { nanoid } from 'nanoid';
import React from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Form from './Form/Form';

import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('New contact(s)');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleForm = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handleFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <section>
        <h1 className={css.formTitle}>Phonebook</h1>
        <Form onSubmit={this.handleForm} />
        <div className={css.filterBlock}>
          <h2 className={css.contactTitle}>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.handleFilter} />
        </div>
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </section>
    );
  }
}
