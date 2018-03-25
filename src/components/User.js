import React, { Component } from 'react';

class User extends Component  { //  creating a messagelist class component, and export it.
constructor(props) { //initialize to use the state object
    super(props);

    this.state = {  // initializes the state to whatever
      user: [], // store a list of users and additional elements from firebase
     }

    this.userRef = this.props.firebase.database().ref('user'); // object to interact with data stored in this path

}

signIn(e) { //function to display sign in button
    // e.preventDefault()
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithPopup( provider );
}

signOut(e) { //function to display sign out button
    this.props.firebase.auth().signOut();
}

render () {
  return (
    <div>
      <button onClick={this.signIn.bind(this)}>Login With Google</button>
      <button onClick={this.signOut.bind(this)}>Logout Now</button>
    </div>
  )
}
 //<button className="sign-in-out" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
//<button onClick={this.props.signIn}>Login With Google</button>
}
export default User;
