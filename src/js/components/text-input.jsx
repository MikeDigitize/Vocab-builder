import React, { PropTypes } from 'react';
import styles from '../../scss/text-input';

const TextInput = () => (
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
    <h2 className={`${styles.modeText}`}>Save Mode</h2>
  </div>
);

// TextInput.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onInputChange: PropTypes.func.isRequired,
//   textInputState: PropTypes.string.isRequired,
//   currentWord: PropTypes.string.isRequired,
//   currentSearchTerm: PropTypes.string.isRequired
// };

export default TextInput;