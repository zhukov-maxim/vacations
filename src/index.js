import React from 'react';
import ReactDOM from 'react-dom';
import Vacations from './Vacations';
import './index.less';

const data = [
  {
    name: 'Иванов Иван',
    dayRanges: [
      '2017.02.24-2017.03.10',
      '2017.04.04-2017.04.27',
      '2017.05.24-2017.05.27'
    ]
  },
  {
    name: 'Петров Петр',
    dayRanges: [
      '2017.04.02-2017.04.06',
      '2017.08.24-2017.08.27',
      '2017.09.04-2017.09.07',
      '2017.10.24-2017.10.27'
    ]
  }
];

ReactDOM.render(
  <Vacations data={data}/>,
  document.getElementById('root')
);
