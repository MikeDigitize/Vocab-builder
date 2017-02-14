import React, { PropTypes } from 'react';

const ResultsTable = ({ searchResults, startIndex }) => (
	<div>
		<table className="table">
		  <thead className="thead-inverse">
		    <tr>
		      <th>#</th>
		      <th>Word</th>
		      <th>Definition</th>
		      <th>Synonyms</th>
		    </tr>
		  </thead>
		  <tbody>
		  	{ searchResults.map((result, i) => (
		  		<tr key={ i }>
		  			<th scope="row">{ startIndex + i }</th>
		  			<td>{ result.word }</td>
		  			<td>{ result.data.definition }</td>
		  			<td>{ result.data.synonyms.length }</td>
		  		</tr>)
		  	) }
		  </tbody>
		</table>
		{ 
			!!searchResults.slice(3, searchResults.length).length && 
			<h2>{ searchResults.slice(3, searchResults.length).length } result(s) hidden</h2>
		}
	</div>
);

ResultsTable.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.shape({
  	word: PropTypes.string.isRequired,
  	data: PropTypes.shape({
  		definition: PropTypes.string.isRequired,
  		synonyms: PropTypes.arrayOf(PropTypes.string)
  	}).isRequired
  })).isRequired,
  startIndex: PropTypes.number.isRequired
};

export default ResultsTable;