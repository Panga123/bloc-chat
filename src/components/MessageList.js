import React, { Component } from 'react';

class MessageList extends Component  { //  creating a messagelist class component, and export it.
constructor(props) { //initialize to use the state object
    super(props);

    this.state = {  // initializes the state to whatever
      messages: [], // store a list of messages and additional elements from firebase
      displayedMessage: '',
      newMessage: '',
      username: '',
      content: '',
      sentAt: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages'); // object to interact with data stored in this path

}



displayMessage(e) { //function to display  message
     e.preventDefault()
      const displayedMessage = this.state.displayedMessage;
      this.messagesRef.push({ name: displayedMessage });
}

createMessage(e) { //function to create and store a list of messages
      e.preventDefault();
      const newMessage = this.state.newMessage;
      this.messagesRef.push({ name: newMessage });

}

  componentWillReceiveProps(nextProps) { //updates when we receive props
    this.setState({ messages: [] });
    let messages = [];
    this.messagesRef.orderByChild('roomId').equalTo(nextProps.activeRoom.key).on("child_added", snapshot => {
      console.log(snapshot.val());
      const message = snapshot.val();
      message.key = snapshot.key;
      messages.push(message);
      this.setState({ messages: messages });
    }); //search by room ID and find the id that equals this and do the following
  }


  render() {
      return (


      <div>
        <h2>Current Room: {this.props.activeRoom.name}</h2>

          <section className="MessageList">
          <ul>
          {this.state.messages.map ((message, i) => (  //to loop over the message array to render its contents Q: why state and not props?
            <li key={message.key}>{message.content} {message.roomId}</li>
          ))}
          </ul>

          </section>
     </div>



    );
  }

}
export default MessageList;
