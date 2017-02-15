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

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.mode !== this.props.mode) {
      this.refs.input.focus();
    }

  }

  focus() {
    this.refs.input.focus();
  }

  onChange(evt) {

    const { mode, onUserInput, onSearch } = this.props;
    const { value } = evt.target;
    onUserInput(value);
    if(mode === 'search') {
      onSearch(value);
    }

  }

  onSubmit() {

    const { value } = this.refs.input;
    const { onSubmitItem } = this.props;
    if(testWordLength(value, 2)) {
      onSubmitItem();
    }
    else {
      this.focus();
    }  

  }

  render() {

    const { mode, saveItem, searchItem } = this.props;
    return (
      <div>
        <div className="form-inline">
          <input 
            className={ `form-control shadow text-input ${mode !== 'save' ? 'text-search' : ''}` }
            type="text"
            ref="input"
            maxLength="25"
            value={ mode === 'save' ? saveItem : searchItem }
            onChange={ this.onChange.bind(this) }
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
  searchItem: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};