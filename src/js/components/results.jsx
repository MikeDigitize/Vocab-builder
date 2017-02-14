import React, { PropTypes, Component } from 'react';
import styles from '../../scss/results';
import ResultsTable from './results-table';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { showAllResults: false };
  }
  toggleShowAllResults() {
    this.setState({
      showAllResults: !this.state.showAllResults
    });
  }
  render() {
    const { wordCount, lastSavedWord, mode, searchResults, isSearching } = this.props;
    const resultCount = searchResults.length;
    const hiddenResults = searchResults.slice(3, resultCount);
    const results = searchResults.slice(0, 3);
    return (
      <div className={ `${styles.resultsContainer}` }>
        <h4>Words in vocab: { wordCount } 
          <span 
            className={ `${styles.lastSavedWord}` }>
            { lastSavedWord ? `Your latest word: ${lastSavedWord}` : '' }
          </span>
        </h4>
        { mode === 'search' && isSearching &&
          <div className={ `${styles.results}` }>
            { isSearching && !resultCount ?
              <p>Sorry! No results found.</p> :
              <div>
                <h2>Search Results <span className={ `${styles.resultTotal}` }>(total of { resultCount })</span></h2>
                <ResultsTable searchResults={ results } startIndex={ 1 } />
                { 
                  searchResults.length > 3 && 
                  <div>
                    <h2 onClick={ this.toggleShowAllResults.bind(this) }>
                      { 
                        !this.state.showAllResults ? `${hiddenResults.length} result(s) hidden, click to show` : 'Click to hide' }
                    </h2>
                    {
                      this.state.showAllResults && <ResultsTable searchResults={ hiddenResults } startIndex={ 4 } />
                    }
                  </div>
                }
              </div>
            }           
          </div> 
        }
      </div>
    );
  }
}

Results.propTypes = {
  wordCount: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
	searchResults: PropTypes.array.isRequired,
  lastSavedWord: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired
};