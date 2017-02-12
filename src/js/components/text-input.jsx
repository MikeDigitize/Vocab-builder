import React, { PropTypes } from 'react';
import styles from '../../scss/text-input';

const TextInput = ({ mode, onUserInput, saveTerm, searchTerm, onSubmitWord }) => {
  return (
    <div>
      <div className="form-inline">
        <input 
          className={ `form-control shadow text-input ${mode !== 'save' ? 'text-search' : ''}` }
          type="text"
          value={ mode === 'save' ? saveTerm : searchTerm }
          onChange={ onUserInput }
          placeholder={ mode === 'save' ? 'Save word...' : 'Search for...'}
        />
        { mode === 'save' && 
          <button 
            type="button" 
            className="btn btn-primary submit-btn"
            onClick={ onSubmitWord }>
            Save
          </button>
        }          
      </div>
      <h2 className={`${styles.modeText}`}>{ mode } Mode</h2>
    </div>
  );
};

TextInput.propTypes = {
  onSubmitWord: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  saveTerm: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default TextInput;