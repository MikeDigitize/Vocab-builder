import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import HomeContainer from './home-container';
import EditContainer from './edit-container';
import NotFound from './404';
import styles from '../../scss/nav';

const Root = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-xl-6 offset-xl-3">
          <Link className={ `${styles.navLink}` } to="/">Home</Link>
          <Link className={ `${styles.navLink}` } to="/edit">Edit</Link>
        </div>
      </div>

      <Switch>
        <Route exact path="/" component={ HomeContainer }/>
        <Route path="/edit" component={ EditContainer }/>
        <Route component={ NotFound }/>
      </Switch>
    </div>
  </Router>
);

export default Root;