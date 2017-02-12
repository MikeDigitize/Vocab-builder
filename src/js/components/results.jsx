import React, { PropTypes } from 'react';
import styles from '../../scss/results-container';

const Results = () => (
  <div className={ `${styles.resultsContainer}` }>
    <h4>Words in vocab: 0 
      <span 
        className={ `${styles.latestWord}` }>
      </span>
    </h4>
  </div>
);

export default Results;