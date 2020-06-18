import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from "react-dom";
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import "./index.css";
//import App from "./App";
//import "bootstrap/dist/css/bootstrap.css";

class Grid extends React.Component {
  constructor(props){
    super(props);
	
    this.state = {
      table: [[<td></td>,<td></td>],[<td></td>,<td></td>]],

    };
  }

  returnTrs(){
    var temp = this.state.table;
    
    var trs = [];
    for(let i = 0; i < temp.length; i++)
      trs.push(<tr>{temp[i]}</tr>);

    return trs;
  }

  addRows(){
    console.log("Add Rows");
    var temp = this.state.table;
    var row = [];
    
    if (temp.length === 0)
      row.push(<td></td>)

    else
      row.push(temp[0]);
   
    temp.push(row);
    this.setState({table:temp});
  }

  addColumns(){
    console.log("Add Columns");
    var temp = this.state.table;

    if (temp.length === 0)
      temp.push([<td></td>])

    else
    {
      for (let i = 0; i < temp.length; i++)
	    	temp[i].push(<td></td>);
    }

    this.setState({table:temp});

  }

  removeRows(){
    console.log("Remove Rows");
    var temp = this.state.table;

    if (temp.length === 0)
      alert("No rows to remove");

    else
      temp.pop(<td></td>);

    this.setState({table:temp});
  }

  removeColumns(){
    console.log("Remove Columns");
    var temp = this.state.table;

    if (temp.length === 0)
      alert("No columns to remove");

    else
    {  
      for (let i = 0; i < temp.length; i++)
        temp[i].pop(<td></td>);
    }

    this.setState({table:temp});
  }

  fillAllUncolored(){
    console.log("Fill All Uncolored");
  }

  fillAll(){
    console.log("Fill All");
  }

  clear(){
    console.log("Clear");
  }

  render() {

    return(
	  <div>
      <button onClick={() => this.addRows()}>Add Rows</button>
      <button onClick={() => this.addColumns()}>Add Columns</button>
      <button onClick={() => this.removeRows()}>Remove Rows</button>
      <button onClick={() => this.removeColumns()}>Remove Columns</button>
      <button onClick={() => this.fillAllUncolored()}>Fill All Uncolored</button>
      <button onClick={() => this.fillAll()}>Fill All</button>
      <button onClick={() => this.clear()}>Clear</button>
      <select>
          <option hidden>Select Color</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yellow</option>
      </select>
      <table>
	  {this.returnTrs()}
      </table>
    </div>
    
    );

  }
}

ReactDOM.render(
  <Grid />,
  document.getElementById('root')
);

export default Grid;

