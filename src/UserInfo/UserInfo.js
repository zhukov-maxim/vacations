import React, { Component } from 'react';
import './UserInfo.less';
import UserVacations from '../UserVacations/UserVacations';

class UserInfo extends Component {
  renderLoginMessage() {
    const { onClickLoginButton } = this.props;

    return (
      <div className="user-info__login-message">
        Мы вас не узнали,&nbsp;
        <span
          className="user-info__link user-info__link_login"
          onClick={onClickLoginButton}
        >
          войдите через Гугл-аккаунт
        </span>
      </div>
    );
  }

  renderUserDetails() {
    const { allVacations, userUid,
            onClickLogoutButton, onAddVacation } = this.props;

    return (
      <div className="user-info__details">
        <div className="user-info__header">
          <div className="user-info__name">
            {this.props.userFullName}
          </div>
          <span
            className="user-info__link user-info__link_logout"
            onClick={onClickLogoutButton}
          >
            Выйти
          </span>
        </div>
        <UserVacations
          userUid={userUid}
          allVacations={allVacations}
          onAddVacation={onAddVacation}
        />
    </div>
    );
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="user-info">
        {
          isLoggedIn ?
            this.renderUserDetails() :
            this.renderLoginMessage()
        }
      </div>
    );
  }
}

export default UserInfo;

UserInfo.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  userUid: React.PropTypes.string.isRequired,
  userFullName: React.PropTypes.string.isRequired,
  allVacations: React.PropTypes.array,
  onClickLoginButton: React.PropTypes.func.isRequired,
  onClickLogoutButton: React.PropTypes.func.isRequired,
  onAddVacation: React.PropTypes.func.isRequired
}
