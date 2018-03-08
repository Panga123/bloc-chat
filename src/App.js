import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZhMqpK7Gtg1BtDZ7weGwsw2vsDxsgdlA",
    authDomain: "blocchat-a2bd0.firebaseapp.com",
    databaseURL: "https://blocchat-a2bd0.firebaseio.com",
    projectId: "blocchat-a2bd0",
    storageBucket: "blocchat-a2bd0.appspot.com",
    messagingSenderId: "48408474556"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        helloWorld: 'howdy world',
          currentRoom: ''
      }

  }

  render() {
      return (
        <div className="App">

          <header>
          <h1> Basic Chat</h1>
        </header>

        <RoomList
          firebase={firebase}
        />

        </div>
      );
    }


}

export default App;
