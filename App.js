import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from "react-dom";
import { findRenderedComponentWithType } from 'react-dom/test-utils';
//import "./info.css";
//import App from "./App";
//import "bootstrap/dist/css/bootstrap.css";

class Info extends React.Component {
  addRows(){
    console.log("Add Rows");
  }

  addColumns(){
    console.log("Add Columns");
  }

  removeRows(){
    console.log("Remove Rows");
  }

  removeColumns(){
    console.log("Remove Columns");
  }
  render() {
    
    };

    return<div>
      <button onClick={this.addRows}>Add Rows</button>
      <button onClick={this.addColumns}>Add Columns</button>
      <button onClick={this.removeRows}>Remove Rows</button>
      <button onClick={this.removeColumns}>Remove Columns</button>
    </div>
  }
}

export default Info;

