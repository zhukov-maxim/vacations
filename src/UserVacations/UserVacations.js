import React, { Component } from 'react';
import DateRangePickerWrapper from '../DateRangePickerWrapper/DateRangePickerWrapper';
import DayPickerRangeControllerWrapper from '../Stateful/DayPickerRangeControllerWrapper/DayPickerRangeControllerWrapper';
import moment from 'moment';
import './UserVacations.less';

class UserVacations extends Component {
  // Expected format: "2017.01.09-2017.01.12":
  getFormattedDayRange(value) {
    const dates = value.split('-');
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[1]);

    const dateFormatFull = {
      month: 'long',
      day: 'numeric'
    };

    const dateFormatShort = {
      day: 'numeric'
    };

    const isMonthTheSame = firstDate.getMonth() === lastDate.getMonth();

    if (isMonthTheSame) {
      return firstDate.toLocaleString('ru-RU', dateFormatShort) + ' — '+ lastDate.toLocaleString('ru-RU', dateFormatFull);
    }

    return firstDate.toLocaleString('ru-RU', dateFormatFull) + ' — '+ lastDate.toLocaleString('ru-RU', dateFormatFull);
  }

  // Expected format: "2017.01.09-2017.01.12":
  getNumberOfDaysInDayRange(value) {
    const dates = value.split('-');
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[1]);
    const numberOfDaysInDayRange = (lastDate - firstDate) / 1000 / 60 / 60 / 24 + 1;

    return numberOfDaysInDayRange;
  }

  getCurrentUserDayRanges() {
    const currentUserVacations = this.props.allVacations.filter(
      item => item.userUid === this.props.userUid
    );

    if (!currentUserVacations.length) {
      return null;
    }

    return currentUserVacations[0].dayRanges.sort();
  }

  renderCurrentUserDayRanges() {
    const currentUserDayRanges = this.getCurrentUserDayRanges();

    if (!currentUserDayRanges) {
      return null;
    }

    return (
      currentUserDayRanges.map((item, index) => (
        <tr key={index}>
          <td>
            {this.getFormattedDayRange(item)}
          </td>
          <td>
            {this.getNumberOfDaysInDayRange(item)}
          </td>
        </tr>
      ))
    );
  }

  renderStats() {
    return (
      <div className="user-vacations__stats">
        <table className="user-vacations__stats-table">
          <thead>
            <tr>
              <th>
                Даты
              </th>
              <th>
                Дни
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderCurrentUserDayRanges()}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if (!this.props.allVacations) {
      return (
        <div className="user-vacations">
        </div>
      );
    }

    return (
      <div className="user-vacations">
        <div className="user-vacations__controls">
          <div className="user-vacations__controls-content">
            <DateRangePickerWrapper
              onSubmit={this.props.onAddVacation}
            />
            {this.renderStats()}
            <DayPickerRangeControllerWrapper
              minimumNights={0}
              onOutsideClick={() => console.log('DayPickerRangeController::onOutsideClick')}
              onPrevMonthClick={() => console.log('DayPickerRangeController::onPrevMonthClick')}
              onNextMonthClick={() => console.log('DayPickerRangeController::onNextMonthClick')}
              initialStartDate={moment().add(3, 'days')}
              initialEndDate={moment().add(13, 'days')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserVacations;

UserVacations.propTypes = {
  onAddVacation: React.PropTypes.func.isRequired,
  userUid: React.PropTypes.string.isRequired,
  allVacations: React.PropTypes.array
}
