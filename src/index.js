import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import HomePage from './HomePage/HomePage'
import ChartPage from './ChartPage/ChartPage'
import './index.less';

const firebaseConfig = {
  apiKey: "AIzaSyATgjF2vSNyKj8csUOOpS2B0fn5_COvE-g",
  authDomain: "vacations-29eb5.firebaseapp.com",
  databaseURL: "https://vacations-29eb5.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

let theApp = {
  user: {
    isLoggedIn: false,
    fullName: '',
    email: '',
    uid: ''
  },

  usersRef: firebase.database().ref('users'),
  vacationsRef: firebase.database().ref('vacations'),
  userVacationsRef: firebase.database().ref('user-vacations'),

  users: null,
  vacations: null,
  userVacations: null,

  initApp () {
    firebase.auth().onAuthStateChanged(user =>
      this.onAuthStateChanged(user)
    );
  },

  signIn () {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    // TODO: Handle awaiting state and catch errors.
    firebase.auth().signInWithPopup(provider);
  },

  signOut() {
    firebase.auth().signOut();
  },

  onAuthStateChanged(user) {
    if (user) {
      this.user = {
        isLoggedIn: true,
        fullName: user.displayName,
        uid: user.uid,
        email: user.email
      };

      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        username: user.displayName,
        email: user.email
      });
    }
    else {
      this.user = {
        isLoggedIn: false,
        fullName: '',
        uid: '',
        email: ''
      };
    }
    this.fetchUsers();
    this.fetchVacations();
    this.fetchUserVacations();
    this.render();
  },

  fetchUsers() {
    this.usersRef.on('value', snapshot => {
      const rawList = snapshot.val();
      const result = [];

      for (let key in rawList) {
        if (rawList.hasOwnProperty(key)) {
          result.push(rawList[key].username);
        }
      }

      this.users = result;
      this.render();
    });
  },

  fetchVacations() {
    this.vacationsRef.on('value', snapshot => {
      const rawList = snapshot.val();
      const result = [];

      for (let key in rawList) {
        if (rawList.hasOwnProperty(key)) {
          result.push({
            uid: key,
            userUid: rawList[key].uid,
            info: rawList[key].employee + ': ' + rawList[key].daysRange
          });
        }
      }

      this.vacations = result;
      this.render();
    });
  },

  fetchUserVacations() {
    this.userVacationsRef.on('value', snapshot => {
      const rawList = snapshot.val();
      const result = [];

      for (let key in rawList) {
        if (rawList.hasOwnProperty(key)) {
          let name = null;
          let userUid = null;
          let dayRanges = [];
          const vacationsOfUser = rawList[key];

          for (let keyInner in vacationsOfUser) {
            if (vacationsOfUser.hasOwnProperty(keyInner)) {
              if (!name) {
                name = vacationsOfUser[keyInner].employee;
              }
              if (!userUid) {
                userUid = vacationsOfUser[keyInner].userUid;
              }
              dayRanges.push(vacationsOfUser[keyInner].daysRange);
            }
          }

          result.push({
            name: name,
            dayRanges: dayRanges,
            userUid: userUid
          });
        }
      }

      this.userVacations = result;
      this.render();
    });
  },

  addVacation(firstDate, lastDate) {
    const vacationData = {
      employee: this.user.fullName,
      userUid: this.user.uid,
      daysRange: firstDate + '-' + lastDate
    };

    // Get a key for a new Post.
    const newVacationKey = firebase.database().ref().child('vacations').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/vacations/' + newVacationKey] = vacationData;
    updates['/user-vacations/' + this.user.uid + '/' + newVacationKey] = vacationData;

    return firebase.database().ref().update(updates);
  },

  removeVacation(uid) {
    let updates = {};
    updates['/vacations/' + uid] = null;
    updates['/user-vacations/' + this.user.uid + '/' + uid] = null;

    return firebase.database().ref().update(updates);
  },

  renderHomePage() {
    return (
      <HomePage onClickLoginButton={theApp.signIn}/>
    );
  },

  renderChartPage() {
    return (
      <ChartPage
        onClickLogoutButton={theApp.signOut}
        onAddVacation={(start, end) => this.addVacation(start, end)}
        userUid={theApp.user.uid}
        userFullName={theApp.user.fullName}
        allVacations={this.userVacations}
      />
    );
  },

  render() {
    ReactDOM.render(
      <div>
        {
          theApp.user.isLoggedIn ?
            this.renderChartPage() :
            this.renderHomePage()
        }
      </div>,
      document.getElementById('root')
    );
  }
}

theApp.initApp();
