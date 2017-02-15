import React, { Component, PropTypes } from 'react';
import ModeControlContainer from './mode-control-container';
import ResultsContainer from './results-container';
import ModalContainer from './modal-container';
import TextInputContainer from './text-input-container';

export default class Home extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onAppInitialise();
	}

	render() {

		const { isAppDataLoaded } = this.props;
		if(isAppDataLoaded) {
			return (
				<div className="col-xl-6 offset-xl-3">
			    <ModeControlContainer />
			    <TextInputContainer />
			    <ResultsContainer />		
			    <ModalContainer />
			  </div>
			);
		}
		return false;
		
	}

}

Home.propTypes = {
  onAppInitialise: PropTypes.func.isRequired,
  isAppDataLoaded: PropTypes.bool.isRequired
};