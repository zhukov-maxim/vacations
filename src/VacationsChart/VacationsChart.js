import React, { Component } from 'react';
import Vacations from '../Vacations/Vacations';
import './VacationsChart.less';

class VacationsChart extends Component {
  render() {
    return (
      <div className="vacations-chart">
        <div className="vacations-chart__title">
          Отпускные дни сотрудников<br/>
          Sbertech Intelligence Lab в 2016 году
        </div>
        <Vacations data={this.props.data}/>
      </div>
    );
  }
}

export default VacationsChart;
