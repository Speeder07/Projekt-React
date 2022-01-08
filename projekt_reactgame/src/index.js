import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState} from 'react';
import Grain from './GrainGrow.js';
import * as Fr from './Fractions';
import * as GG from './GrainGrow';


let timer_scale = 100;

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




function IsFieldExist(arr, x, y) {
  return arr[x][y] !== undefined;
}




const lx = 20, ly = 20;
class Board extends React.Component{
  
  constructor(props) {
    super(props);
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= Fr.fr_blank;
      }
    }
    this.state = {
      array : arr
    }
    this.Update = this.Update.bind(this);

  }

  Update(i) {
    let temp_array =JSON.parse(JSON.stringify(this.state.array));

    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        if (this.state.array[x][y].id==0) {
          if (!GG.Rule01(this.state.array,temp_array, x, y)) 
            if (!GG.Rule02(this.state.array,temp_array, x, y))  
              if (!GG.Rule03(this.state.array,temp_array, x, y))  
                GG.Rule04(this.state.array,temp_array, x, y);
        }
      }
    }
    this.setState({array : temp_array,});


    i++;
    setTimeout(this.Update, timer_scale, i);
  }

  componentDidMount() {
    let temp = AlterTable(this.state.array, 5,5, Fr.fr_one);
    this.setState({array : temp,});
    let temp2 = AlterTable(this.state.array, 2,10, Fr.fr_two);
    this.setState({array : temp2,});
    let temp3 = AlterTable(this.state.array, 16,15, Fr.fr_three);
    this.setState({array : temp3,});
    setTimeout(this.Update, timer_scale, 1);
  }



  render() {
    

    return (
      <div>
        <Pallete/>
        <Timer/>
      
        <div className='position'>
          <div id="board" /*style={{ gridtemplatecolumns: "repeat("+lx+", 40px)" }}*/>
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
        </div>
      </div>
    );
  }
}


function Pallete(params) {
  
  
  function toggle() {
    document.getElementById('pallete').classList.toggle('show');
    console.log("toggle");
  }
  
  return(
    <div id='pallete'>
      <button className='showbutton_pallete' onClick={toggle}>{'>'}</button>
    </div>
  );
}

function Timer(params) {
  
  
  function toggle() {
    document.getElementById('timer').classList.toggle('show');
    console.log("toggle");
  }
  
  return(
    <div id='timer'>
      <button className='showbutton_timer' onClick={toggle}>{'^'}</button>
    </div>
  );
}


ReactDOM.render(
  <Board/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
