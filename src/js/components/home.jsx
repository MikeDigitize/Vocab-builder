import React from 'react';
import AppModeControl from './app-mode-control';
import TextInput from './text-input';
import Results from './text-input';
import Modal from './modal';

const Home = () => (
  <div className="col-xl-6 offset-xl-3">
    <AppModeControl />
    <Results />
    <Modal />
  </div>
);

export default Home;