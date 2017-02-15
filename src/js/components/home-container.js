import { connect } from 'react-redux';
import VocabDatabase from '../utils/database';
import { onModeChange } from '../actions/global-actions';
import { onAppDataLoaded } from '../actions/database-actions';
import Home from './home';

function mapStateToProps(state) {
  return {
    isAppDataLoaded: state.database.isAppDataLoaded
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onAppInitialise() {
      let lastSavedWord = '';
      VocabDatabase.iterate(function(data, word) {
        if(data.isLatestWord) {
          lastSavedWord = word;
        }
      })
      .then(() => VocabDatabase.keys())
      .then(function(keys) {
        const wordCount = keys.length;  
        dispatch(onAppDataLoaded({ wordCount, lastSavedWord }));          
      });
    },
    onChangeMode(mode) {
      dispatch(onModeChange(mode));
    }
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;