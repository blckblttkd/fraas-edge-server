import 'core-js';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import Root from './components/Root';

ReactDOM.hydrate(<Root />, document.getElementById('root'));
