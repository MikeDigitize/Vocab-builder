import React, { PropTypes } from 'react';
import TextInput from './text-input';
import styles from '../../scss/app-mode-control';

const AppModeControl = ({ onChangeMode, mode }) => (
  <div>
    <div className={`${styles.modeControlHolder}`}>       
      <span 
        data-mode="save" 
        className={`${styles.modeBtn} ${styles.save}`}
        onClick={ () => onChangeMode('save') }>
        Save
      </span>
      <h1 className="title">Vocab</h1>
      <span 
        data-mode="search" 
        className={`${styles.modeBtn} ${styles.search}`}
        onClick={ () => onChangeMode('search') }>
        Search
      </span> 
    </div>
    <TextInput mode={ mode } />
  </div>
)

AppModeControl.propTypes = {
  onChangeMode: PropTypes.func.isRequired
};

export default AppModeControl;