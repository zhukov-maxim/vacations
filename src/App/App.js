import React, { Component } from 'react';
import './App.less';
import UserInfo from '../UserInfo/UserInfo';
import Vacations from '../Vacations/Vacations';
import Loader from '../Loader/Loader';

class App extends Component {
  renderVacations() {
    return (
      <div className="app__vacations">
        <h2>График отпусков отдела</h2>
        <Vacations data={this.props.allVacations}/>
      </div>
    );
  }

  render() {
    const { allVacations, isUserLoggedIn, userFullName, userUid,
            onClickLoginButton, onClickLogoutButton, onAddVacation } = this.props;

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
  onAddVacation: React.PropTypes.func.isRequired
}