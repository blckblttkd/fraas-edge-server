import 'core-js';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './components/Test';

ReactDOM.hydrate(<Test />, document.getElementById('root'));
