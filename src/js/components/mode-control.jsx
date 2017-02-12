import React, { PropTypes } from 'react';
import styles from '../../scss/mode-control';

const ModeControl = ({ onChangeMode }) => (
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
);

ModeControl.propTypes = {
  onChangeMode: PropTypes.func.isRequired
};

export default ModeControl;