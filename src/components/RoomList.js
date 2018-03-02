import React, { Component } from 'react';
import '../App.css';
 console.log("testing")

class RoomList extends Component { //  creating a roomlist class component, and export it.
  constructor(props) { //initialize to use the state object
    super(props);
    this.state = {  // use the react state object so that component will re-render itself each time user clicks each room
      rooms: [] // store a list of rooms
    };
    this.roomsRef = this.props.firebase.database().ref('rooms') // object to interact with data stored in this path
  }

  render() { // using map to display data for each room
    return (
      <section className="RoomList">
      <ul>
         {this.state.rooms.map ((room, i) => (  //to loop over the room array to render its contents Q: why state and not props?
           <li key={room.key}>{room.name}</li>
         ))}
     </ul>
      </section>

    );
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key; 
       this.setState({ rooms: this.state.rooms.concat( room ) })

     });
   }

}
export default RoomList;
