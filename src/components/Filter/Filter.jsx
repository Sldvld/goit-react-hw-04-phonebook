import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <input
      className={css.filterForm}
      name="filter"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
