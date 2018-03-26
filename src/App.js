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
    user: '',
    currentUser: 'Guest'
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

  setUser(user) {  //setuser method to store user info. Then pass method to user component as prop below
     this.setState ({user: user});
 }

// setUser = (e) => {
//  e.preventDefault();
//  const newUserName = e;
////  this.setState({ currentUser: newUserName })
//}
 //displayName(user) {
  //  this.setState({displayName: user});
    //console.log(firebase.User);
//}

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
            activeRoom={this.state.activeRoom}
            user={this.state.user}
           //currentUser={this.state.currentUser}
          />

          <User
            firebase={firebase}
            setUser={this.setUser.bind(this)}
            //user={this.state.user}
            //welcome={currentUser}
            displayName={this.state.user.displayName} //its on the state not on prop
          />


    </div>
  );
}

}
export default App;
