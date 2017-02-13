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
      this.props.onSubmitItem();
    }
    else {
      this.focus();
    }    
  }
  render() {
    let { mode, onUserInput, saveItem, searchItem } = this.props;
    return (
      <div>
        <div className="form-inline">
          <input 
            className={ `form-control shadow text-input ${mode !== 'save' ? 'text-search' : ''}` }
            type="text"
            ref="input"
            maxLength="25"
            value={ mode === 'save' ? saveItem : searchItem }
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
  onSubmitItem: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  saveItem: PropTypes.string.isRequired,
  searchItem: PropTypes.string.isRequired
};