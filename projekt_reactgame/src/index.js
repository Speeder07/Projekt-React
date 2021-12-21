import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function GenerateArray(x, y) {
  return Array(x).fill(0).map(row => new Array(y).fill(0))
}

function DisplayGrid(arr) {
  for (let i of arr) {
    for (let j of i) {
      <div>{j}</div>
    }
    <br/>
  }
  return arr;
}

class Board extends React.Component{



  constructor(props) {
    super(props);
    
  }

  render() {
    const arr = GenerateArray(15,7);
    return (
      <div className="board">
        {arr.map((items, index)=>{
          return(
            <div>
              {items.map((subItem, sIndex)=>{
                return <div>{subItem}</div>;
              })}
              <br/>
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
