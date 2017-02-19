import React, { PropTypes, Component } from 'react';
import styles from '../../../scss/results';
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

    const { wordCount, lastSavedWord, mode, searchResults, isSearching, onEditToggle } = this.props;
    const { showAllResults } = this.state;
    const resultCount = searchResults.length;
    const hiddenCount = resultCount - 3;
    const results = showAllResults ? searchResults : searchResults.slice(0, 3);

    return (
      <div className={ `${styles.resultsContainer}` }>
        <h4>Words in your gab: <span className={ `${styles.wordCount}` }>{ wordCount }</span> 
          <span 
            className="subtitle">
            { lastSavedWord ? `Your latest word: ${lastSavedWord}` : '' }
          </span>
        </h4>
        { mode === 'search' && isSearching &&
          <div className={ `${styles.results}` }>
            { isSearching && !resultCount ?
              <h2 className={ `${styles.noResults}` }>Sorry! No results found.</h2> :
              <div>
                <h2>Search Results <span className={ `${styles.resultTotal}` }>(total of { resultCount })</span></h2>
                <ResultsTable 
                  searchResults={ results } 
                  onEditToggle={ onEditToggle } 
                  startIndex={ 1 } 
                />
                { 
                  searchResults.length > 3 && 
                  <div>
                    <h2 className={ `${styles.toggleShowHide}` } onClick={ this.toggleShowAllResults.bind(this) }>
                      { 
                        !showAllResults ? `${hiddenCount} result(s) hidden, click to show more` : 'show less'
                      }
                    </h2>                    
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
  isSearching: PropTypes.bool.isRequired,
  onEditToggle: PropTypes.func.isRequired
};