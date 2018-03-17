import React, { Component } from 'react';


class MessageList extends Component  { //  creating a roomlist class component, and export it.
constructor(props) { //initialize to use the state object
    super(props);

    this.state = {  // initializes the state to whatever
    messages: [], // store a list of messages
    newMessage: '',
    displayedMessages: [],
    username: '',
    content: '',
    sentAt: ''
  }

  this.messagesRef = this.props.firebase.database().ref('messages'); // object to interact with data stored in this path

}

  filterMessages = (activeRoom) => { //component that shows messages along the list of available chat rooms
    //  this.setState ({  //read the state
      // let newMessagesOnDisplay = this.state.messages.filter(message => message.room === this.props.currentRoom);
        //console.log(newMessagesOnDisplay);
        //this.setState ({ messagesOnDisplay: newMessagesOnDisplay });
    //  }
    //})

    if (!activeRoom) { return }
      this.setState({ displayedMessages: this.state.Messages.filter( message => message.roomId === activeRoom.key ) }, () => this.scrollToBottom() );
      console.log("testing here");
}

//createMessage(e) { //function to create new list of messages
  //    e.preventDefault()
    //  const newMessage = this.state.newMessage;
      //this.messagesRef.push({ name: newMessage });
//}

  componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
          const messages = snapshot.val();
          messages.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( messages ) });
      });
  }

  render() {
      return (


      <div>
        <h2 onClick={this.filterMessages}>Current Room: {this.props.activeRoom}</h2>
          <section className="MessageList">

          {this.state.messages.map ((message, i) => (  //to loop over the message array to render its contents Q: why state and not props?

          <ul>
            <li key={message.key}>{message.content}</li>
            <li key={message.key}>{message.roomId}</li>
            <li key={message.key}>{message.sentAt}</li>
            <li key={message.key}>{message.userName}</li>
          </ul>

          ))}
          
          </section>
     </div>
          //<section className="filterMessages">
            //  {this.state.messages.map ((message, i) => (
              //      <li className="messagename" onClick={() => this.props.filterMessages(message.content)} key={i}>

                //    </li>
              //))}
              //</section>


    );
  }

}
export default MessageList;
