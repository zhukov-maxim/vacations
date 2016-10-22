import React from 'react';
import ReactDOM from 'react-dom';
import VacationsChart from './VacationsChart/VacationsChart';
import {data} from './testData';
import './index.less';

ReactDOM.render(
  <VacationsChart data={data}/>,
  document.getElementById('root')
);
