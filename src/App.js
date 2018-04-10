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

    super(props); // initialize empty user property on state of constructor
    this.state = {
      activeRoom: '',
      user: 'Guest'
    }
}

getMessageChange(newMessage) {
    this.setState(
      { currentMessage: newMessage },
      function () {
        console.log(this.state.currentMessage)

      }
    );
  }

getNameChange(roomName) {
    this.setState(
      { currentRoom: roomName },
      function () {
        console.log(this.state.currentRoom)

      }
    );
  }

  setUser(user) {  //setuser method to store/change user info. Then pass method to user component as prop below
     this.setState ({user: user});
 }

// setUser = (e) => {
//  e.preventDefault();
//  const newUserName = e;
////  this.setState({ currentUser: newUserName })
//}
// displayName(user) {
  //  this.setState({displayName: user});
    //console.log(firebase.user);
//}

  selectRoom (room)  { //highlight the room that you clicked
    this.setState({activeRoom: room})
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
            activeRoom={this.state.activeRoom}
            user={this.state.user}

          />

          <User
            firebase={firebase}
            setUser={this.setUser.bind(this)}
            displayName={this.state.user.displayName}
              user={this.props.user}

          //  user={this.state.user}

          />


    </div>
  );
}

}
export default App;
