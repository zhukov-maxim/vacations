import React, { Component } from 'react';

import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './DateRangePickerWrapper.less';

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.startDate.format('YYYY.MM.DD'), this.state.endDate.format('YYYY.MM.DD'));
    this.setState({
      startDate: null,
      endDate:null
    });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    const isSubmitEnabled = startDate && endDate;

    return (
      <div className="date-range-picker-wrapper">
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          displayFormat='YYYY.MM.DD'
        />
        {
          isSubmitEnabled ?
            <button
              className="date-range-picker-wrapper__submit"
              onClick={this.handleSubmit}
            >
              Добавить
            </button> :
            null
        }
      </div>
    );
  }
}

export default DateRangePickerWrapper;

DateRangePickerWrapper.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
