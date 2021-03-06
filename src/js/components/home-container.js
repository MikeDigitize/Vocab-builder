import { connect } from 'react-redux';
import VocabDatabase from '../utils/database';
import { onAppDataLoaded } from '../actions/database-actions';
import Home from './home/home';

function mapStateToProps(state) {
  return {
    isAppDataLoaded: state.database.isAppDataLoaded
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onAppInitialise() {

      let lastSavedWord = '';

      VocabDatabase
        .iterate(function(data, word) {

          if(data.isLatestWord) {
            lastSavedWord = word;
          }

        })
        .then(() => VocabDatabase.keys())
        .then(function(keys) {

          const wordCount = keys.length;  
          dispatch(onAppDataLoaded({ wordCount, lastSavedWord }));   
                 
        });
    }
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;