import React, { PropTypes } from 'react';
import styles from '../../scss/results';
import ResultsTable from './results-table';

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
				<h2>Search Results <span className={ `${styles.resultTotal}` }>(total of { searchResults.length })</span></h2>
				{ isSearching && !searchResults.length ?
					<p>Sorry! No results found.</p> :
          <ResultsTable searchResults={ searchResults } />
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