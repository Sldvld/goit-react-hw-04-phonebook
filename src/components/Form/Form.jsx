import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

export function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.currentTarget.value);
        break;
      case 'number':
        setNumber(evt.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = evt.currentTarget.elements;
    const newContact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    onSubmit(newContact);
    resetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.formLabel}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Add name"
          value={name}
          onChange={handleChange}
          className={css.formInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.formLabel}>Number</label>
        <input
          type="tel"
          name="number"
          placeholder="Add number: "
          value={number}
          onChange={handleChange}
          className={css.formInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button type="submit" className={css.formButton}>
          Add contact
        </button>
      </form>
    </>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
