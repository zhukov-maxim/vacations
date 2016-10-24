import React from 'react';
import ReactDOM from 'react-dom';
import VacationsChart from './VacationsChart/VacationsChart';
import './index.less';

import {initializeGoogleApi, getData} from './googleApiWrapper';
initializeGoogleApi();

ReactDOM.render(
  <div className="loader-wrapper">
    <div className="loader">
      Loading...
    </div>
  </div>,
  document.getElementById('root')
);

getData().then(
  result => {
    ReactDOM.render(
      <VacationsChart data={result}/>,
      document.getElementById('root')
    );
  },
  error => {
    console.log(error);
    ReactDOM.render(
      <div style={{margin: 40}}>
        <h1>
          =8 (
        </h1>
        <p>
          Something went wrong...
        </p>
      </div>,
      document.getElementById('root')
    );
  }
);
