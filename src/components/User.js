import React, { Component } from 'react';

class User extends Component  { //  creating a messagelist class component, and export it.
//constructor(props) { //initialize to use the state object
  //  super(props);

  //  this.state = {  // initializes the state to whatever
  //    user: [], // store a list of users and additional elements from firebase
  //   }

  //  this.userRef = this.props.firebase.database().ref('user'); // object to interact with data stored in this path
//}


componentDidMount () {
  // listen for authentication state change (login, logout, etc)
  // when authentication changes, grab the user object, pass it back up to the parent component
  // parent component then updates its own state with the user data
  this.props.firebase.auth().onAuthStateChanged( user => {

    if (user !== null) {

    console.log(user);
    this.props.setUser(user); // calling set user if firebase user changes
  }
  });
}

  signIn(e) { //function to display sign in button
    // e.preventDefault()
    //  var user;
    //  if (user !== null) {

        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
      //}
   }



   signOut(e) { //function to display sign out button

      this.props.firebase.auth().signOut().then(function() {

          console.log('Signed Out');

      },

      function(error) {
          console.error('Sign Out Error', error);
        });

    }

render () {


    return (

      <div>
        <button onClick={this.signIn.bind(this)}>Login With Google</button>
        <button onClick={this.signOut.bind(this)}>Logout Now</button>
        <h2>User: {this.props.displayName}</h2>



     </div>

    //<div>{this.props.user.displayName}</div>
    )

}
 //<button className="sign-in-out" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
//<button onClick={this.props.signIn}>Login With Google</button>
}
export default User;
