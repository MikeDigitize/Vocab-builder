import React, { PropTypes } from 'react';
import styles from '../../scss/results-container';

const Results = ({ wordCount, lastSavedWord, mode, searchResults, isSearching }) => (
  <div className={ `${styles.resultsContainer}` }>
    <h4>Words in vocab: { wordCount } 
      <span 
        className={ `${styles.lastSavedWord}` }>
        { lastSavedWord ? `Your latest word: ${lastSavedWord}` : '' }
      </span>
    </h4>
    { mode === 'search' && isSearching &&
					<div className={ `${styles.results}` }>
						<hr />
						<h2>Search Results</h2>
						{ isSearching && !searchResults.length ?
							<p>Sorry! No results found.</p> :
							<ul>
								{ searchResults.map(result => <li>{ result }<span><br /></span></li>) }
							</ul>
						}						
					</div> 
				}
  </div>
);

Results.propTypes = {
  wordCount: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
	searchResults: PropTypes.array.isRequired,
  lastSavedWord: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired
};

export default Results;