import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = nanoid(10);
  numberInputId = nanoid(10);

  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <label htmlFor={this.nameInputId} className={css.formLabel}>
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Add name"
            value={this.state.name}
            onChange={this.handleChange}
            className={css.formInput}
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={this.numberInputId} className={css.formLabel}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            placeholder="Add number: "
            value={this.state.number}
            onChange={this.handleChange}
            className={css.formInput}
            id={this.numberInputId}
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
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
