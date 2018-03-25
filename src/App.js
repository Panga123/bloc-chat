import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import User from './components/User';
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
    activeRoom: '',
    user: ''
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

  setUser(user) {
     this.setState({user: user});
 }

  selectRoom (room)  {
    this.setState({activeRoom: room})
    console.log(this.state.activeRoom);

  }
//Q: Why does signIn need to be in App and not user? (had it there first)
  render() {
    return (
      <div className="App">

        <header>
            <h1> Basic Chat</h1>
        </header>

        <RoomList
            firebase={firebase}
            selectRoom={this.selectRoom.bind(this)}
         />

         <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom} user={this.state.user}
          />

          <User
            firebase={firebase}
            setUser={this.setUser.bind(this)} user={this.state.user} />





    </div>
  );
}
//  <User
  //   firebase={firebase}
    // signIn={this.signIn.bind(this)}
   ///>
}
export default App;
