import React, { Component } from 'react';


class MessageList extends Component  { //  creating a roomlist class component, and export it.
constructor(props) { //initialize to use the state object
    super(props);

    this.state = {  // use the react state object so that component will re-render itself each time user clicks each message
    messages: [], // store a list of messages
    newMessage: ''
  //  username: "", content: "", sentAt: "", messages: [], toEdit: ""
    }

this.messagesRef = this.props.firebase.database().ref('messages'); // object to interact with data stored in this path

}

render() {
  return (

    <div className="activeroom" onClick={this.props.onClick}>

  );
}

//render() {
  //return (

    //<div>
        //<h2 onClick={this.filterMessagesByRoom}>Current Room: {this.props.currentRoom}</h2>

    //  <ul>
      //    {this.state.messagesOnDisplay.map( (message, index) =>

        //    <DisplayedMessages
          //    message={message}
            //  index={index}
            ///>
          //})

      //  </ul>
      //</div>
//  )
//}

createMessage(e) { //function to create and store a list of messages
      e.preventDefault();
      const newMessage = this.state.newMessage;
      this.messagesRef.push({ name: newMessage });

}

componentDidMount() {
  this.MessagesRef.on('child_added', snapshot => {
  const messages = snapshot.val();
  messages.key = snapshot.key;
  this.setState({ messages: this.state.messages.concat( messages ) })
  });
}

}
export default MessageList;
