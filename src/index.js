import React from 'react';
import ReactDOM from 'react-dom';
import Vacations from './Vacations';
import {data} from './testData';
import './index.less';

ReactDOM.render(
  <Vacations data={data}/>,
  document.getElementById('root')
);
