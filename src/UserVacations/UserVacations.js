import React, { Component } from 'react';
import DateRangePickerWrapper from '../DateRangePickerWrapper/DateRangePickerWrapper';
import { newDate } from '../utils';
import './UserVacations.less';

class UserVacations extends Component {
  // Expected format: "2017.01.09-2017.01.12":
  getFormattedDayRange(value) {
    const dates = value.split('-');
    const firstDate = newDate(dates[0]);
    const lastDate = newDate(dates[1]);

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
    const firstDate = newDate(dates[0]);
    const lastDate = newDate(dates[1]);
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
      currentUserDayRanges.map(item => (
        <tr key={item.key}>
          <td>
            {this.getFormattedDayRange(item.daysRange)}
          </td>
          <td style={{textAlign: 'right'}}>
            {this.getNumberOfDaysInDayRange(item.daysRange)}
          </td>
          <td>
            <span
              className="user-vacations__delete-vacation"
              onClick={() => {
                this.props.onRemoveVacation(item.key);
              }}
            >
              ×
            </span>
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
              <th>
                {/* Controls */}
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
          </div>
        </div>
      </div>
    );
  }
}

export default UserVacations;

UserVacations.propTypes = {
  onAddVacation: React.PropTypes.func.isRequired,
  onRemoveVacation: React.PropTypes.func.isRequired,
  userUid: React.PropTypes.string.isRequired,
  allVacations: React.PropTypes.array
}
