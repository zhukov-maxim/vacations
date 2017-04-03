import React, { Component } from 'react';
import { dayOfYear, MONTHS, COLORS } from '../utils';
import { newDate } from '../utils';
import './Chart.less';

const dayWidth = 2; // Ширина отметки одного дня в px.

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVerticalRulerVisible: false,
      verticalRulerPosition: 0
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  renderMonthHeader = (month, index) => {
    const style = {
      width: month.days * dayWidth
    };

    return (
      <th
        className="chart__table-header-item_month"
        style={style} // TODO: Handle actual number of days.
        key={index}
      >
        {month.name}
      </th>
    );
  }

  renderEmployee = (data, index) => {
    const dayRanges = data.dayRanges;

    const style = {
      width: 365 * dayWidth // TODO: Handle leap years.
    }

    return (
      <tr key={index}>
        <td className="chart__table-employee">
          {data.name}
        </td>
        <td colSpan="12">
          <div
            className="chart__table-employee-days"
            key={index}
            style={style}
          >
            {dayRanges.map(this.renderEmployeeDayRange)}
          </div>
        </td>
      </tr>
    );
  }

  renderEmployeeDayRange = (dayRange, index) => {
    const dayRangeArray = dayRange.daysRange.split('-');

    const firstDate = newDate(dayRangeArray[0]);
    const lastDate = newDate(dayRangeArray[1]);

    const firstDayNumber = dayOfYear(firstDate);
    const lastDayNumber = dayOfYear(lastDate);

    const style = {
      left: dayOfYear(firstDate) * dayWidth,
      width: (lastDayNumber - firstDayNumber + 1) * dayWidth
    }

    const firstDateDay = firstDate.getDate();
    const lastDateDay = lastDate.getDate();


    const {data} = this.props;
    const numberOfEmployeesByDayNumber = this.getNumberOfEmployeesByDayNumber(data);
    let daysInrange = [];
    for (let i = firstDayNumber; i < lastDayNumber; i++) {
      daysInrange.push(numberOfEmployeesByDayNumber[i]);
    }

    return (
      <div
        className="chart__table-employee-day-range"
        style={style}
        key={index}
      >
        <div className="chart__table-employee-day-range-dates">
          {firstDateDay}–{lastDateDay}
        </div>
      </div>
    );
  }

  getNumberOfEmployeesByDayNumber(data) {
    const allVacations = data.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue.dayRanges);
    }, []);

    const allDayRanges = allVacations.map(currentValue => {
      return currentValue.daysRange;
    });

    const allDayRangesByDayNumber = allDayRanges.map(currentValue => {
      const dayRangeArray = currentValue.split('-');
      const firstDate = newDate(dayRangeArray[0]);
      const lastDate = newDate(dayRangeArray[1]);
      const firstDayNumber = dayOfYear(firstDate);
      const lastDayNumber = dayOfYear(lastDate);

      return [firstDayNumber, lastDayNumber];
    });

    const allDays = [];
    allDayRangesByDayNumber.map(currentValue => {
      for (let i = currentValue[0]; i < currentValue[1]; i++) {
        allDays.push(i);
      }
      return 0;
    });

    let numberOfEmployeesByDayNumber = new Array(365);
    numberOfEmployeesByDayNumber.fill(0);

    allDays.forEach(currentValue => {
      numberOfEmployeesByDayNumber[currentValue] += 1;
    });

    return numberOfEmployeesByDayNumber;
  }

  renderDay(value, index) {
    const horizontalScale = dayWidth;

    const style = {
      width: horizontalScale,
      backgroundColor: COLORS[value]
    };

    return (
      <div className="chart__table-employee-day" style={style} key={index}>
      </div>
    );
  }

  renderVerticalRuler() {
    const verticalRulerStyle = {
      visibility: this.state.isVerticalRulerVisible ? 'visible' : 'hidden',
      left: this.state.verticalRulerPosition
    };

    return (
      <div
        className="chart__table-vertical-ruler"
        style={verticalRulerStyle}
      />
    );
  }

  handleMouseEnter(event) {
    this.setState({
      isVerticalRulerVisible: true
    });
  }

  handleMouseLeave(event) {
    this.setState({
      isVerticalRulerVisible: false
    });
  }

  handleMouseMove(event) {
    const tableWrapperOffsetX = this.refs.tableWrapper.getBoundingClientRect().left;
    const cursorPageOffsetX = event.clientX;
    const cursorInsideWrapperOffsetX = cursorPageOffsetX - tableWrapperOffsetX;

    this.setState({
      verticalRulerPosition: cursorInsideWrapperOffsetX
    });
  }

  render() {
    const {data} = this.props;
    const numberOfEmployeesByDayNumber = this.getNumberOfEmployeesByDayNumber(data);

    return (
      <div className="chart">
        <div
          className="chart__table-wrapper"
          ref="tableWrapper"
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          {this.renderVerticalRuler()}
          <table className="chart__table">
            <thead>
              <tr className="chart__table-header">
                <th className="chart__table-header-item_employee"></th>
                <th colSpan="12">
                  {numberOfEmployeesByDayNumber.map(this.renderDay)}
                </th>
              </tr>
              <tr className="chart__table-header">
                <th className="chart__table-header-item_employee"></th>
                {MONTHS.map(this.renderMonthHeader)}
              </tr>
            </thead>
            <tbody>
              {data.map(this.renderEmployee)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: React.PropTypes.array.isRequired
}

export default Chart;
