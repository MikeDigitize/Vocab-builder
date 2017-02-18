import React, { PropTypes } from 'react';
import styles from '../../scss/mode-control';

const ModeControl = ({ onChangeMode }) => (
  <div className={`${styles.modeControlHolder}`}>       
    <span 
      data-mode="save" 
      className={`${styles.modeBtn}`}
      onClick={ () => onChangeMode('save') }>
      Save
    </span>
    <h1 className="title">Gift Gab</h1>
    <span 
      data-mode="search" 
      className={`${styles.modeBtn}`}
      onClick={ () => onChangeMode('search') }>
      Search
    </span> 
  </div>
);

ModeControl.propTypes = {
  onChangeMode: PropTypes.func.isRequired
};

export default ModeControl;