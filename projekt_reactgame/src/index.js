import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState} from 'react';
import Grain from './GrainGrow.js';

function Square(props) {
  
  return(
    <div style={{backgroundColor : props.fraction.color}}></div>
  )
}

function AlterTable(arr, x, y, content) {
  arr[x][y] = content;
  return arr;
}


class Fraction
{
  constructor(color, id)
  {
    this.color = color;
    this.id = id;
  }
}

function Update() {
  
}

class Board extends React.Component{
  
  constructor(props) {
    super(props);
    const lx = 15, ly = 15;
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= new Fraction("#fff", 0);
      }
    }
    this.state = {
      array : arr
    }
    let temp = AlterTable(this.state.array, 5,5, new Fraction("#ccc", 1));
    this.setState({array : temp,});
    let temp2 = AlterTable(this.state.array, 2,7, new Fraction("#f5c6a9", 2));
    this.setState({array : temp2,});


  }

  render() {
    
    return (
      <div className="board">
        {this.state.array.map((items, index)=>{
          return(
            <div>
              {items.map((subItem, sIndex)=>{
                return <Square key={subItem.x+"|"+
                subItem.y} x={index} y={sIndex} fraction={subItem} />;
              })}
            </div>
            
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <Board/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
