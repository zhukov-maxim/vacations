import React, { Component } from 'react';
import Vacations from '../Vacations/Vacations';
import DateRangePickerWrapper from '../DateRangePickerWrapper/DateRangePickerWrapper';
import Footer from '../Footer/Footer';
import './ChartPage.less';

const VACATION_DAYS_IN_YEAR = 28;

class ChartPage extends Component {
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

  // Expected an array of day ranges: "2017.01.09-2017.01.12":
  getNumberOfVacationDays(dayRanges) {
    return dayRanges.reduce((prev, current) => prev + this.getNumberOfDaysInDayRange(current), 0)
  }

  renderHeader() {
    return (
      <div className="chart-page__header">
        <div className="chart-page__user-name">
          {this.props.userFullName}
        </div>
        <div
          className="chart-page__logout"
          onClick={this.props.onClickLogoutButton}
        >
        </div>
      </div>
    );
  }

  getCurrentUserDayRanges() {
    return this.props.allVacations.filter(
      item => item.userUid === this.props.userUid
    )[0].dayRanges.sort();
  }

  renderStats() {
    const currentUserDayRanges = this.getCurrentUserDayRanges();

    return (
      <div className="chart-page__stats">
        <table className="chart-page__stats-table">
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
            {
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
            }
          </tbody>
        </table>
      </div>
    );
  }

  renderMain() {
    if (!this.props.allVacations) {
      return (
        <div className="chart-page__main">
        </div>
      );
    }

    const daysLeft = VACATION_DAYS_IN_YEAR - this.getNumberOfVacationDays(this.getCurrentUserDayRanges());

    return (
      <div className="chart-page__main">
        <div className="chart-page__controls">
          <div className="chart-page__controls-header">
            Осталось еще {daysLeft} дня отпуска
          </div>
          <div className="chart-page__controls-content">
            <DateRangePickerWrapper
              onSubmit={this.props.onAddVacation}
            />
            {this.renderStats()}
          </div>
        </div>
        <div className="chart-page__chart">
          {<Vacations data={this.props.allVacations}/>}
        </div>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="chart-page__footer">
        <Footer/>
      </div>
    );
  }

  render() {
    return (
      <div className="chart-page">
        {this.renderHeader()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default ChartPage;

ChartPage.propTypes = {
  onClickLogoutButton: React.PropTypes.func.isRequired,
  onAddVacation: React.PropTypes.func.isRequired,
  userUid: React.PropTypes.string.isRequired,
  userFullName: React.PropTypes.string.isRequired,
  allVacations: React.PropTypes.array
}
