import React from 'react';
import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from "react-dom";
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import "./index.css";
//import App from "./App";
//import "bootstrap/dist/css/bootstrap.css";

var color = "white";

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgColor: "",
    };
  }

 fillCell(){
  this.setState({
    bgColor: color
  })
 } 

fillUncolored()
{
  console.log("Original Color: ", this.state.bgColor);
  if (this.state.bgColor == "white" || this.state.bgColor == "")
  {
    this.fillCell();
    console.log("New Color: ", this.state.bgColor);
  }
}

  render() {
    return(
    <td style ={{backgroundColor: this.state.bgColor}} onClick={() => this.fillCell()}></td>
    );
  }
}

class Grid extends React.Component {
  constructor(props){
    super(props);

    //Base table
    this.state = {
      table: [],
      bgColor: "",
      value: "select",
	    reflist:[],
    };
  }

  //Creates table
  returnTrs(){
    var temp = this.state.table;
    
    var trs = [];
    for(let i = 0; i < temp.length; i++)
      trs.push(<tr style = {{backgroundColor: "white"}}>{temp[i]}</tr>);

    return trs;
  }

  handlePeriodChange(selVal) {
    color = selVal;
  }

  addRows(){
    console.log("Add Rows");
    var temp = this.state.table;
    var row = [];
    var reefs = this.state.reflist;
	  var newrefs = [];
	
	
    
   if (temp.length === 0)
	 {
		const reef = React.createRef();
      row.push(<Cell ref={reef}/>);
	    newrefs.push(reef);
	 }
   else
	 {
		 for (let i = 0; i < temp[0].length; i++)
		 {
			 const reef = React.createRef();
			 row.push(<Cell ref={reef}/>);
			 newrefs.push(reef);
		 }
	 }
   
    temp.push(row);
    reefs.push(newrefs);
    this.setState({table:temp});
    this.setState({reflist:reefs});
  }

  addColumns(){
    console.log("Add Columns");
    var temp = this.state.table;

  	var reefs = this.state.reflist;
	  var newrefs = [];
	
	
    if (temp.length === 0)
  	{
      const reef = React.createRef();
      temp.push([<Cell ref={reef}/>]);
      newrefs.push([reef]);
      reefs.push(newrefs);
  	}
    else
    {
      for (let i = 0; i < temp.length; i++)
      {
        const reef = React.createRef();
        temp[i].push(<Cell ref={reef}/>);
        reefs[i].push(reef);
      }

    }
	
  	this.setState({reflist:reefs});
    this.setState({table:temp});

  }

  removeRows(){
    console.log("Remove Rows");
    var temp = this.state.table;
    var tempref = this.state.reflist;

    if (temp.length === 0)
      alert("No rows to remove");

    else
    {
      //temp.pop(<td></td>)
      tempref.pop();
    }

    this.setState({table:temp});
  }

  removeColumns(){
    console.log("Remove Columns");
    var temp = this.state.table;
    var tempref = this.state.reflist;

    if (temp.length === 0)
      alert("No columns to remove");

    else
    {  
      for (let i = 0; i < temp.length; i++)
      {
        //temp[i].pop(<td></td>)
        tempref[i].pop();
      }
    }

    this.setState({table:temp});
  }

  fillAllUncolored(){
    console.log("Fill All Uncolored");
    	
    var reefs = this.state.reflist;
    console.log(reefs);
    console.log(this.state.table);
    for (let i = 0; i < reefs.length; i++)
  	{
      for (let j = 0; j < reefs[i].length; j++)
      {
        reefs[i][j].current.fillUncolored();
      }
	  }
  }

  fillAll(){
    console.log("Fill All");
	
    var reefs = this.state.reflist;
    console.log(reefs);
    console.log(this.state.table);
    for (let i = 0; i < reefs.length; i++)
  	{
      for (let j = 0; j < reefs[i].length; j++)
      {
        reefs[i][j].current.fillCell();
      }
	  }
  }

  clear(){
    console.log("Clear");
    var temp = this.state.table;
    temp = [];
    this.setState({table:temp});
  }

  render() {

    const cellcolor = {
      color: "white",
      backgroundColor: "white"
    };
    return(
	  <div>
      <button onClick={() => this.addRows()}>Add Rows</button>
      <button onClick={() => this.addColumns()}>Add Columns</button>
      <button onClick={() => this.removeRows()}>Remove Rows</button>
      <button onClick={() => this.removeColumns()}>Remove Columns</button>
      <button onClick={() => this.fillAllUncolored()}>Fill All Uncolored</button>
      <button onClick={() => this.fillAll()}>Fill All</button>
      <button onClick={() => this.clear()}>Clear</button>
      <select onChange={(val) => this.handlePeriodChange(val.target.value)}>
          <option hidden>Select Color</option>
          <option value = "red">Red</option>
          <option value = "blue">Blue</option>
          <option value = "green">Green</option>
          <option value = "yellow">Yellow</option>
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

