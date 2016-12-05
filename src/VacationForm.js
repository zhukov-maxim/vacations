import React, { Component } from 'react';
import DateRangePickerWrapper from './DateRangePickerWrapper'
import './VacationForm.less';

// Мaximum number of vacation days:
const MAX_LENGTH = 14;

const VALIDATION_ERRORS = {
  MIN_LENGTH: 'Дата окончания отпуска должна быть не меньше даты начала.',
  MAX_LENGTH: 'Отпуск не может быть длиннее 14 дней.'
}

class VacationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstDate: '2017-01-01',
      lastDate: '2017-01-02',
      error: null
    }

    this.handleFirstDateChange = this.handleFirstDateChange.bind(this);
    this.handleLastDateChange = this.handleLastDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.validateForm();
  }

  // Returns number of vacation days including both ends:
  getVacationNumberOfDays (firstDate, lastDate) {
    return (new Date(this.state.lastDate) - new Date(this.state.firstDate)) / 24 / 60 / 60 / 1000 + 1;
  }

  validateForm() {
    // TODO: Add multiple concurrent errors support.
    if (this.state.firstDate > this.state.lastDate) {
      this.setState({
        error: VALIDATION_ERRORS.MIN_LENGTH
      });
    }
    else if (this.getVacationNumberOfDays(this.state.firstDate, this.state.lastDate) > MAX_LENGTH) {
      this.setState({
        error: VALIDATION_ERRORS.MAX_LENGTH
      });
    }
    else {
      this.setState({
        error: null
      });
    }
  }

  handleFirstDateChange(event) {
    this.setState({
      firstDate: event.target.value
    }, () => this.validateForm());
  }

  handleLastDateChange(event) {
    this.setState({
      lastDate: event.target.value
    }, () => this.validateForm());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.firstDate, this.state.lastDate);
  }

  render() {
    return (
      <div className='vacations-form'>
        <h3>
          Добавить отпуск
        </h3>
        <form>
          <label>
            Первый день отпуска:
            <input type="date" defaultValue={this.state.firstDate} onChange={this.handleFirstDateChange}/>
          </label>
          <label>
            Последний день отпуска:
            <input type="date" defaultValue={this.state.lastDate} onChange={this.handleLastDateChange}/>
          </label>
          {
            this.state.error ?
              <div className='vacations-form__error'>
                {this.state.error}
              </div> :
              null
          }
          <button
            onClick={this.handleSubmit}
            disabled={this.state.error}
          >
            Add vacation
          </button>
        </form>
        <DateRangePickerWrapper/>
      </div>
    );
  }
}

export default VacationForm;

VacationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
