import React, { PropTypes, Component } from 'react';
import { testWordLength } from '../utils/validation';
import styles from '../../scss/text-input';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.focus();
  }
  focus() {
    this.refs.input.focus();
  }
  onSubmit() {
    let { value } = this.refs.input;
    if(testWordLength(value, 2)) {
      this.props.onSubmitWord();
    }
    else {
      this.focus();
    }    
  }
  render() {
    let { mode, onUserInput, saveTerm, searchTerm } = this.props;
    return (
      <div>
        <div className="form-inline">
          <input 
            className={ `form-control shadow text-input ${mode !== 'save' ? 'text-search' : ''}` }
            type="text"
            ref="input"
            maxLength="25"
            value={ mode === 'save' ? saveTerm : searchTerm }
            onChange={ evt => onUserInput(evt.target.value) }
            placeholder={ mode === 'save' ? 'Save word...' : 'Search for...'}
          />
          { mode === 'save' && 
            <button 
              type="button" 
              className="btn btn-primary submit-btn"
              onClick={ this.onSubmit.bind(this) }>
              Save
            </button>
          }          
        </div>
        <h2 className={`${styles.modeText}`}>{ mode } Mode</h2>
      </div>
    );
  }
}

TextInput.propTypes = {
  onSubmitWord: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  saveTerm: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired
};