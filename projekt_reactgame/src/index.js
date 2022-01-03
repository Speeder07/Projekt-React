import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState} from 'react';
import Grain from './GrainGrow.js';

let timer_scale = 1000;

function Square(props) {
  
  return(
    <div key={props.x+"|"+props.y}
     style={{backgroundColor : props.fraction.color}}>{props.x+"|"+props.y}</div>
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

function IsFieldExist(arr, x, y) {
  return arr[x][y] !== undefined;
}

function Rule01(array, sx, sy) {
  let tab =new Array(0);
  for (let x = sx-1; x <= sx+1; x++) {
    for (let y = sy-1; y <= sy+1; y++) {
      if (x == sx && y == sy) 
        continue;
      
      if (array[x]===undefined  ) 
        continue;
      
      if (array[x][y]===undefined) 
        continue;

        if (array[x][y].id > 0) {
          let asigned = false;
          tab.forEach(element => {
            if (element.id === array[x][y].id) {
              element = {id : element.id, count : element.count+1};
              asigned = true;
            }
          });
          if (!asigned) {
            tab.push({id: array[x][y].id, count: 1})
          }
        }
      
    }
  }
  for (const element of tab) {
    console.log(sx+" "+sy+"  "+ element.id +"|"+element.count);
  }
}


const lx = 15, ly = 15;
class Board extends React.Component{
  
  constructor(props) {
    super(props);
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= new Fraction("#fff", 0);
      }
    }
    this.state = {
      array : arr
    }
    this.Update = this.Update.bind(this);

  }

  Update(i) {
    
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        if (this.state.array[x][y].id==0) {
          Rule01(this.state.array, x, y);
        }
      }
    }
    i++;
    setTimeout(this.Update, timer_scale, i);
  }

  componentDidMount() {
    let temp = AlterTable(this.state.array, 5,5, new Fraction("#ccc", 1));
    this.setState({array : temp,});
    let temp2 = AlterTable(this.state.array, 2,7, new Fraction("#f5c6a9", 2));
    this.setState({array : temp2,});
    this.Update(1);
  }

  render() {
    
    return (
      <div className="board">
        {this.state.array.map((items, index)=>{
          return(
            <div key={index}>
              {items.map((subItem, sIndex)=>{
                return <Square x={index} y={sIndex} fraction={subItem} />;
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
