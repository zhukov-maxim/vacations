import React, { Component } from 'react';
import './HomePage.less';

class HomePage extends Component {
  renderJumbotron() {
    return (
      <div className="home-page__jumbotron">
        <div className="home-page__title">
          Календарь отпусков
        </div>
        <button
          className="home-page__login-button"
          onClick={this.props.onClickLoginButton}
        >
          Войти с помощью Гугл
        </button>
      </div>
    );
  }

  renderNavigation() {
    return (
      <div className="home-page__navigation">
        <a className="home-page__navigation-item" href="#">
          Что это?
        </a>
        <a className="home-page__navigation-item" href="#">
          Как работает
        </a>
        <a className="home-page__navigation-item" href="#">
          Пожелания
        </a>
      </div>
    );
  }

  renderMain() {
    return (
      <div className="home-page__main">
        {this.renderNavigation()}
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="home-page__footer">
        <div className="home-page__footer-logo">
        </div>
        <div className="home-page__footer-copyright">
          Версия 0.1<br/>
          © 2016
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home-page">
        {this.renderJumbotron()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default HomePage;

HomePage.propTypes = {
  onClickLoginButton: React.PropTypes.func.isRequired
}
