import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";

//Global variable makes it easier to assign 
//background colors to each cell
var color = "white";

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgColor: "",
      testBool: false,
    };
  }

isPressed(){
    this.fillCell();
    this.setState({testBool: true});
    console.log("Pressed: ", this.state.testBool);
 }

 isNotPressed(){
    this.setState({testBool: false});
 }

 dragFill(){
	if (this.state.testBool === true)
	{
   		this.fillCell();
	}
 } 

 fillCell(){
     this.setState({bgColor: color});
 } 

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
		onMouseDown={() => this.isPressed()}
		onMouseUp={() => this.isNotPressed()}
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

  clear(){
    console.log("Clear");
    var temp = this.state.table;
    temp = [];
    this.setState({table:temp});
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
