import React, { Component } from 'react';
import Vacations from '../Vacations/Vacations';
import DateRangePickerWrapper from '../DateRangePickerWrapper/DateRangePickerWrapper';
import Footer from '../Footer/Footer';
import './ChartPage.less';

class ChartPage extends Component {
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

  renderMain() {
    const data = this.props.data;

    return (
      <div className="chart-page__main">
        <div className="chart-page__controls">
          <div className="chart-page__controls-header">
            Осталось еще 2 дня отпуска
          </div>
          <div className="chart-page__controls-content">
            <DateRangePickerWrapper
              onSubmit={this.props.onAddVacation}
            />
          </div>
        </div>
        <div className="chart-page__chart">
          {
            data ?
              <Vacations data={this.props.data}/> :
              null
          }
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
  userFullName: React.PropTypes.string.isRequired,
  data: React.PropTypes.array
}
