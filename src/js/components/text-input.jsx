import React, { PropTypes } from 'react';
import styles from '../../scss/text-input';

const TextInput = ({ mode }) => {
  return (
    <div>
      <div className="form-inline">
        <input 
          className={ `form-control shadow text-input` }
          type="text"
          placeholder="Save"
        />
        <button 
          type="submit" 
          className="btn btn-primary submit-btn">
          Save
        </button>           
      </div>
      <h2 className={`${styles.modeText}`}>{ mode } Mode</h2>
    </div>
  );
}

TextInput.propTypes = {
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  mode: PropTypes.string.isRequired,
  currentWord: PropTypes.string,
  currentSearchTerm: PropTypes.string
};

export default TextInput;