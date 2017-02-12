import React, { PropTypes } from 'react';
import styles from '../../scss/app-mode-control';

const AppModeControl = () => (
  <div className={`${styles.modeControlHolder}`}>       
    <span 
      data-mode="save" 
      className={`${styles.modeBtn} ${styles.save}`}>
      Save
    </span>
    <h1 className="title">Vocab</h1>
    <span 
      data-mode="search" 
      className={`${styles.modeBtn} ${styles.search}`}>
      Search
    </span> 
  </div>
);

// AppModeControl.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onInputChange: PropTypes.func.isRequired,
//   textInputState: PropTypes.string.isRequired,
//   currentWord: PropTypes.string.isRequired,
//   currentSearchTerm: PropTypes.string.isRequired
// };

export default AppModeControl;