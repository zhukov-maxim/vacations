import React, { Component } from 'react';
import './App.less';
import UserInfo from '../UserInfo/UserInfo';
import Chart from '../Chart/Chart';
import Loader from '../Loader/Loader';

class App extends Component {
  renderVacations() {
    return (
      <div className="app__vacations">
        <h2>График отпусков отдела</h2>
        <Chart data={this.props.allVacations}/>
      </div>
    );
  }

  render() {
    const { allVacations, isUserLoggedIn, userFullName, userUid,
            onClickLoginButton, onClickLogoutButton,
            onAddVacation, onRemoveVacation } = this.props;

    const isFetchingVacations = isUserLoggedIn && !allVacations;
    const isVacationsFetched = isUserLoggedIn && allVacations;

    return (
      <div className="app">
        <UserInfo
          isLoggedIn={isUserLoggedIn}
          userUid={userUid}
          userFullName={userFullName}
          allVacations={allVacations}
          onClickLoginButton={onClickLoginButton}
          onClickLogoutButton={onClickLogoutButton}
          onAddVacation={onAddVacation}
          onRemoveVacation={onRemoveVacation}
        />
        { isFetchingVacations && <Loader/> }
        { isVacationsFetched && this.renderVacations() }
      </div>
    );
  }
}

export default App;

App.propTypes = {
  isUserLoggedIn: React.PropTypes.bool.isRequired,
  userUid: React.PropTypes.string.isRequired,
  userFullName: React.PropTypes.string.isRequired,
  allVacations: React.PropTypes.array,
  onClickLoginButton: React.PropTypes.func.isRequired,
  onClickLogoutButton: React.PropTypes.func.isRequired,
  onAddVacation: React.PropTypes.func.isRequired,
  onRemoveVacation: React.PropTypes.func.isRequired
}
