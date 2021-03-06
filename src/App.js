import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";

//Global variable makes it easier to assign 
//background colors to each cell
var color = "white";
var testB = false;

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    bgColor: "",
    };
  }

  //Fills a single cell with the color
 fillCell(){
    this.setState({bgColor: color});
 } 

  //Click and hold (mouseover) from a single cell (start) to a different cell (end)
 dragFill(){
    console.log("Drag: ", testB);
    if (testB === true)
    {
        this.fillCell();
    }
 } 

  //Fills the cell if uncolored
 fillUncolored()
 {
   console.log("Original Color: ", this.state.bgColor);
   if (this.state.bgColor === "white" || this.state.bgColor === "")
   {
     this.fillCell();
     console.log("New Color: ", this.state.bgColor);
   }
 }

  render() {
    return(
        <td 
        style ={{backgroundColor: this.state.bgColor}} 
        onMouseDown={() => this.fillCell()}
        onMouseOver={() => this.dragFill()}
        ></td>
    );
  }
}

class Grid extends React.Component {
  constructor(props){
    super(props);

    //Base table
    this.state = {
      table: [], //Table array
      bgColor: "", //Background cell color
      reflist:[], //Access to class Cell tds 
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

  //Color assigning
  colorChange(selVal) {
    color = selVal;
  }

  //Add rows to the grid
  addRows(){
    console.log("Add Rows");
    var temp = this.state.table;
    var row = [];
    var temprefs = this.state.reflist;
    var newrefs = [];
		
   if (temp.length === 0)
   {
      const tempref = React.createRef();
      row.push(<Cell ref={tempref}/>); 
      newrefs.push(tempref);
   }
   else
   {
        for (let i = 0; i < temp[0].length; i++)
        {
            const tempref  = React.createRef();
            row.push(<Cell ref={tempref}/>);
            newrefs.push(tempref);
	 }
   }
   
    temp.push(row);
    temprefs.push(newrefs);
    this.setState({table:temp});
    this.setState({reflist:temprefs });
  }

  //Add columns to the grid
  addColumns(){
    console.log("Add Columns");
    var temp = this.state.table;

  	var temprefs  = this.state.reflist;
	  var newrefs = [];
	
	
    if (temp.length === 0)
    {
      const tempref  = React.createRef();
      temp.push([<Cell ref={tempref}/>]);
      newrefs.push([tempref]);
      temprefs.push(newrefs);
    }
    else
    {
      for (let i = 0; i < temp.length; i++)
      {
        const tempref  = React.createRef();
        temp[i].push(<Cell ref={tempref}/>);
        temprefs[i].push(tempref);
      }

    }
	
    this.setState({reflist:temprefs});
    this.setState({table:temp});

  }

  //Remove rows from the grid
  removeRows(){
    console.log("Remove Rows");
    var temp = this.state.table;
    var tempref = this.state.reflist;

    if (temp.length === 0)
      alert("No rows to remove");

    else
    {
      temp.pop();
      tempref.pop();
    }

    this.setState({table:temp});
  }

  //Remove columns from the grid
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
        temp[i].pop();
        tempref[i].pop();
      }
    }

    this.setState({table:temp});
  }

  //Fill all uncolored cells with the currently selected color
  fillAllUncolored(){
    console.log("Fill All Uncolored");
    	
    var temprefs = this.state.reflist;
    console.log(temprefs);
    console.log(this.state.table);
    for (let i = 0; i < temprefs.length; i++)
    {
      for (let j = 0; j < temprefs[i].length; j++)
      {
        temprefs[i][j].current.fillUncolored();
      }
    }
  }

  //Fill all cells with the currently selected color
  fillAll(){
    console.log("Fill All");
	
    var temprefs = this.state.reflist;
    console.log(temprefs);
    console.log(this.state.table);
    for (let i = 0; i < temprefs.length; i++)
    {
      for (let j = 0; j < temprefs[i].length; j++)
      {
        temprefs[i][j].current.fillCell();
      }
    }
  }

  //Clear function which erases the grid
  clear(){
    console.log("Clear");
    var temp = this.state.table;
    temp = [];
    this.setState({table:temp});
  }

  //Used for click and hold (mouseover) from a single cell (start) to a different cell (end) by changing value to true on mousedown
 isPressed(){
    testB = true;
    console.log("DOWN: ", testB);
 }

  //Used for click and hold (mouseover) from a single cell (start) to a different cell (end) by changing value to false on mouseup
 isNotPressed(){
    testB = false;
    console.log("UP: ", testB);
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
      <select onChange={(val) => this.colorChange(val.target.value)}>
          <option hidden>Select Color</option>
          <option value = "red">Red</option>
          <option value = "blue">Blue</option>
          <option value = "green">Green</option>
          <option value = "yellow">Yellow</option>
          <option value = "white">White</option>
      </select>
      <table 
          onMouseDown={() => this.isPressed()}
          onMouseUp={() => this.isNotPressed()}>
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
