import React, { Component } from 'react';

class RoomList extends Component { //  creating a roomlist class component, and export it.
constructor(props) { //initialize to use the state object
    super(props);
    this.state = {  // use the react state object so that component will re-render itself each time user clicks each room
      rooms: [], // store a list of rooms
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms'); // object to interact with data stored in this path

}


getNameChange(e) {
  this.setState({ newRoomName: e.target.value });
}

createRoom(e) { //function to create new rooms
      e.preventDefault();
      const newRoomName = this.state.newRoomName;
      this.roomsRef.push({ name: newRoomName });

}

  render() {
    return (


      <div className="menu">
            <form
              className="newroomform"
              onSubmit={(e) => this.createRoom(e) }>

            <label>
                New Room Name:
            <input
              type="text"
              placeholder="Type new name"
              value={this.state.newRoomName}
              onChange={ (e) => this.getNameChange(e) }
            />
            </label>
              <input type="submit" value="Create Room" />
            </form>

        <section className="RoomList">


            {this.state.rooms.map ((room, i) => (  //to loop over the room array to render its contents Q: why state and not props?

                <li
                key={room.key} onClick={ (e) => this.props.selectRoom(room) }>{room.name}</li>


            ))}

        </section>

       </div>
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
