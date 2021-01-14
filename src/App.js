import React from 'react';
import './App.css';
import List from './components/List';


// This is an example of managing a list of items in React, including delete,
// edit and add operations for the list!
// https://stackoverflow.com/questions/36336411/how-do-i-add-react-component-on-button-click

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputList: [], listCat: "", nextID: 0,};
    this.handleNewList = this.handleNewList.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
  }

  // new list
  handleNewList(event) {
    const newCat = this.state.listCat;
    this.setState({
        nextID: this.state.nextID +1,
        listcat: "",
        inputList: [...this.state.inputList,
          {cat: newCat, id: this.state.nextID}]
    });
  }

  // delete list
  handleDeleteList(delID){
    this.setState({ 
      inputList: this.state.inputList.filter( ({list,id}) => id !== delID )
    })
  }

  render() {
    return (
      <div className="container text-center mt-5">
          <h1>LISTRA</h1>
          <h6>Create and manage your lists of items</h6>
          <div className="input-group mb-3 mt-5">
          <input type="text"
                      className="form-control" 
                      onChange={(event) => this.setState({listCat: event.target.value})}
                      placeholder="Enter new list name"
                      />
            <div className="input-group-append">
            <button className="btn btn-secondary" onClick={this.handleNewList.bind(this)}>Add List</button>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 ml-1 mr-1 mt-3">
              {this.state.inputList.map( 
                ({cat,id}) => 
                  <div id="list" className="rounded border border-dark"  key={id}>
                    <List category={cat} id={id}/>
                    <button className="btn btn-outline-danger mb-3"
                            onClick={this.handleDeleteList.bind(this,id)}>Delete list</button>
                  </div>
              )}
          </div>
      </div>
    )
  }
};

export default App;
