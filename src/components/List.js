import React from 'react';
import './List.css';
import ListItem from './ListItem';

// From example code
// This is an example of managing a list of items in React, including delete,
// edit and add operations for the list!

class List extends React.Component {
    
  // items will keep track of our items
  // nextID is the next unique ID (we just increment by 1 each time)
  // editIndex will be the index in the items array of an item beig edited 
  // mode is the current mode... Add or Edit
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode:"Add", priority: "", date: "", notes: "", newItem: false}
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  // We change the text/behavior of our button depending on the mode
  submit() {

    // If we're adding an item to the list...
    if (this.state.mode == "Add")
    {
      // increment the next unique ID, set the input textbox to blank, and put 
      // the item into the list, see the handy "..." syntax explained here:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
      this.setState({ 
        nextID: this.state.nextID + 1,
        input: "",
        date: "",
        notes: "",
        newItem: false,
        items: [...this.state.items, 
                {item: this.state.input, priority: this.state.priority, date: this.state.date, notes: this.state.notes, id: this.state.nextID + 1}]
      })
    } 
    // If we're editing an item in the list
    else 
    {
      // Create a new items list, modify the item at the edit index
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;
      newItems[this.state.editIndex].priority = this.state.priority;
      newItems[this.state.editIndex].date = this.state.date;
      newItems[this.state.editIndex].notes = this.state.notes;

      // Flip back to Add mode, set input textbox to blank, 
      this.setState({ 
        mode: "Add",
        input: "",
        date: "",
        notes: "",
        newItem: false,
        items: newItems
      })      
    }
  }

  // Deletes an item from the list
  delete(delID) {
    
    // Only allow deleting an item if we aren't currently editing an item, 
    // otherwise our method of editing based on items array index will break, 
    // and it's probably not a good idea regardless.
    if (this.state.mode != "Edit")
    {
      // Delete the item with ID delID by filtering out the item using filter:
      // https://www.w3schools.com/jsref/jsref_filter.asp
      this.setState({ 
        items: this.state.items.filter( ({item,id}) => id != delID )
      })
    }    
  }

  // Sets the list to edit mode
  edit(editID) {

    // Get the item to edit itself from the items array based on the id, using 
    // find: https://www.w3schools.com/jsref/jsref_find.asp
    var editItem = this.state.items.find( ({item,id}) => id == editID );

    // Set input to the edit item text, set mode to Edit, set editIndex to be 
    // the index in the items array of the item we are editing (so we can 
    // easily modify the value later)
    this.setState({ 
      input: editItem.item,
      mode: "Edit",
      priority: editItem.priority,
      date: editItem.date,
      notes: editItem.notes,
      newItem: true,
      editIndex: this.state.items.indexOf(editItem)
    })    
  } 

  //priority
  handlePriorityChange(newPriority){
    // console.log(newPriority);s
    this.setState({
        priority: newPriority,
    });
  }

  // new list item
  newItem(){
    if (this.state.newItem === false){
      this.setState({
        newItem: true
      });
    }
    else{
      void(0);
    }
  }

  // We use arrow functions => to generate our list of items right inside our 
  // JSX expression, as well as to handle the onChange event of the input 
  // textbox: https://www.w3schools.com/js/js_arrow_function.asp
  //
  // We setup delete and edit handlers with each item, and we have our button 
  // click handled by the submit handler, all of which are defined above.
  render() {
    return (
      <div className="container mt-3 mb-3 pb-2 pt-2 mr-2 ml-2" id="input">
        <h1 id="list-title">{this.props.category}</h1>
        {/* new list item */}
        {!this.state.newItem && <button className="btn btn-dark ml-3 mb-3" onClick={this.newItem.bind(this)}>{this.state.newItem} New +</button>}
        
        {this.state.newItem && <div >
          {/* Item */}
          <input type="text" 
                onChange={(event) => this.setState({input: event.target.value})}
                value={this.state.input} 
                placeholder="Enter item"
                className="form-control"/>      
          {/* Priority Selection */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text">Priority</label>
            </div>
            <select className="custom-select" 
                    onChange={(event) => this.handlePriorityChange(event.target.value)}>
              <option defaultValue>Choose...</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          {/* Date Selection */}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Date</span>
            </div>
            <input type="date" className="form-control" 
                  onChange={(event) => this.setState({date: event.target.value})}
                  value={this.state.date}>
            </input>
          </div>
          {/* Additional Notes  */}
          <div className="input-group mb-3">
          <input type="text"
                  onChange={(event) => this.setState({notes: event.target.value})}
                  value={this.state.notes}
                  placeholder="Additional Notes"
                  className="form-control"/>
            <div className="input-group-append">
            <button className="btn btn-dark" onClick={this.submit.bind(this)}>{this.state.mode}</button> 
            </div>
          </div>
        </div>}

        {/* results */}
        <div className="results">
            {this.state.items.map( 
              ({item,id,priority,date,notes}) => 
                <div className="card bg-light mr-2" key={id}>
                  <ListItem 
                      item ={item}
                      priority = {priority}
                      date = {date}
                      notes = {notes}
                  />
                  <div className="card-body">
                    <span className="badge badge-pill badge-danger mr-2" onClick={this.delete.bind(this,id)}> Delete </span> 
                    <span className="badge badge-pill badge-info ml-2" onClick={this.edit.bind(this,id)}>Edit</span> 
                  </div>
                </div>
                )}
        </div>
      </div>
    )
  }
};

export default List;
