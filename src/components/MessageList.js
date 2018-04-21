import React, { Component } from 'react';

class MessageList extends Component  { //  creating a messagelist class component, and export it.
  constructor(props) { //initialize to use the state object
    super(props);

    this.state = {  // initializes the state to whatever
      messages: [], // store a list of messages and additional elements from firebase
      displayedMessage: '',
      content: '',
      sentAt: ''

    }

    //STUCK: Populate username property with the current user's username.
    //You'll need to pass user down as a prop from the App component.

    this.messagesRef = this.props.firebase.database().ref('messages'); // object to interact with data stored in this path

  }


  getContentChange(e) {
    this.setState({ content: e.target.value });
  }

  displayMessage(e) { //function to display  message
    e.preventDefault()
    const displayedMessage = this.state.displayedMessage;
    this.messagesRef.push({ name: displayedMessage });
  }

  createMessage(e) { //2. This is a function to create and store a list of messages
    e.preventDefault();


    console.log(this.state.content);
    console.log(this.props.user.displayName);
    console.log(this.props.activeRoom.key);

    //console.log(this.props.firebase.database.TIMESTAMP);
    //create variable with object that stores content username and roomID then pass to firebase
    const newMessage = {
      content: this.state.content,
      username: this.props.user.displayName,
      roomId: this.props.activeRoom.key
    };

   this.messagesRef.push(newMessage);

  }

  componentDidMount() {
    this.updateMessages(this.props.activeRoom.key);
  }

  componentWillReceiveProps(nextProps) {
    this.updateMessages(nextProps.activeRoom.key);
  }

  updateMessages(key) {
    let messages = [];
    // move your listener here
    this.setState({ messages: [] });
    this.messagesRef.orderByChild('roomId').equalTo(key).on("child_added", snapshot => {
      console.log(snapshot.val());
      const message = snapshot.val();
      message.key = snapshot.key;
      messages.push(message);
      this.setState({ messages: messages });
    });
  }

//  componentWillReceiveProps(nextProps) { //updates when we receive props
  //  this.setState({ messages: [] });
    //let messages = [];



  //  if (nextProps.activeRoom.key) {
    //  this.messagesRef.orderByChild('roomId').equalTo(nextProps.activeRoom.key).on("child_added", snapshot => {
      //  console.log(snapshot.val());
        //const message = snapshot.val();
        //message.key = snapshot.key;
        //messages.push(message);
        //this.setState({ messages: messages });
      //}); //search by room ID and find the id that equals this and do the following
  //  }

  //}

  //1. Render a form to manually submit new message
  render() {
    return (

      <div>
      <form
      className="newmessageform"
      onSubmit={(e) => this.createMessage(e) }>

      <label>
      New Message:
      <input
      type="text"
      placeholder="Type your message!"
      value={this.state.content}


      onChange={ (e) => this.getContentChange(e) }

      />
      </label>

      <input type="submit" value="Create Message" />

      </form>



      <h2>Current Room: {this.props.activeRoom.name}</h2>
      <h2>Current Message: {this.props.newMessage}</h2>

      <section className="MessageList">
      <ul>
      {this.state.messages.map ((message, i) => (  //to loop over the message array to render its contents Q: why state and not props?
        <li key={message.key}>{message.content} {message.roomId}</li>
      ))}
      </ul>

      </section>
      </div>

      //<h2>Current Message: {this.props.user && this.props.user.newMessage}</h2>

    );
  }

}
export default MessageList;
