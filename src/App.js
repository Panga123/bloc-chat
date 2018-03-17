import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
    currentRoom: ''
    }
}

getNameChange(roomName) {
    this.setState(
      { currentRoom: roomName },
      function () {
        console.log(this.state.currentRoom)
      }
    );
  }

render() {
  return (
    <div className="App">

      <header>
          <h1> Basic Chat</h1>
      </header>

      <RoomList
          firebase={firebase}
          getNameChange={this.getNameChange.bind(this)}
       />

       <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom} user={this.state.user}
        />



    </div>
  );
}

}
export default App;
