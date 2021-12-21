import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState} from 'react';

function Square(props) {
  
  return(
    <div style={{color : "rgb("+props.x*10+","+props.y*10+","+"0"+")"}}>{props.x}|{props.y}</div>
  )
}


class Board extends React.Component{
  constructor(props) {
    super(props);
    const lx = 15, ly = 15;
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= {x:x, y:y};
      }
    }
    this.state = {
      array : arr
    }
  }

  render() {
    return (
      
      this.setState({array : this.state.array.map(obj => ((obj.x === 2 && obj.y=== 3) ? obj.x = 15 : obj ))});
        

      <div className="board">
        {this.state.array.map((items, index)=>{
          return(
            <div>
              {items.map((subItem, sIndex)=>{
                return <Square key={subItem.x+"|"+
                subItem.y} x={subItem.x} y={subItem.y}/>;
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
