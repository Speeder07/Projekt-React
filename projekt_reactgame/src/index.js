import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Grain from './GrainGrow.js';
import * as Fr from './Fractions';
import * as GG from './GrainGrow';
import * as Pl from './Pallete';


let timer_scale = 1000;
let ismousedown = false;


function Square(props) {
  
  
  function OmMoseDown(e) {
    
    if (e.type === "mousedown") {
      ismousedown = true;
    }
    else
    {
      ismousedown = false;
    }
    console.log(ismousedown);
    Send();
  }


  function Send() {
    props.onClick_Grid(props.x, props.y);
 
  }

  return(
    <div key={props.x+"|"+props.y}
     style={{backgroundColor : props.fraction.color}} onMouseEnter={Send} onMouseUp={OmMoseDown} onMouseDown={OmMoseDown}></div>
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
class GameMenager extends React.Component{
  
  

  constructor(props) {
    super(props);
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= Fr.fr_blank;
      }
    }

    this.state = {
      array : arr,
      Selected_Fraction : null,
      brush: 0
    }

    this.onClick_Grid = this.onClick_Grid.bind(this);
    this.Update = this.Update.bind(this);
    this.onPallete = this.onPallete.bind(this);
    this.Reset = this.Reset.bind(this);
    this.ChangeBrush = this.ChangeBrush.bind(this);
    
    this.brushM = [
      [false, true, false],
      [true, true, true],
      [false, true, false]
    ];

    this.brushH = [
      [false, false, true, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, false, true, false, false]
    ];
  }


  Update(i) {
    let temp_array =JSON.parse(JSON.stringify(this.state.array));

    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        if (this.state.array[x][y].id<=0&&this.state.array[x][y].id!=-1) {
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
    setTimeout(this.Update, timer_scale, 1);
  }

  onPallete(frac)
  {
    console.log(frac);
    this.setState({Selected_Fraction : frac,});
  }

  onTimer(value)
  {
    console.log(value);
  }

  Reset()
  {
    const arr =Array(lx).fill(0).map((row,ri )=> new Array(ly).fill(0));
    for (let x = 0; x < lx; x++) {
      for (let y = 0; y < ly; y++) {
        arr[x][y]= Fr.fr_blank;
      }
    }

    this.setState({array : arr,});
  }

  Start()
  {
    console.log("start");
  }

  Pause()
  {
    console.log("pause");
  }

  
  onClick_Grid(x, y) {
    

    if (ismousedown){
      if (this.state.Selected_Fraction != null) {
        let temp = this.state.array;
        if (this.state.brush==0) {
          temp = AlterTable(temp, x, y, this.state.Selected_Fraction);
        }
        else{
          let lx = 0, ly = -1;
          for (let rx = x-this.state.brush; rx <= x+this.state.brush; rx++) {
            for (let ry = y-this.state.brush; ry <= y+this.state.brush; ry++) {
              
              ly+=1;
              if (this.state.array[rx]===undefined) 
              continue;
            
              if (this.state.array[rx][ry]===undefined) 
              continue;
              
              if (this.state.brush==1)
              {
                if (this.brushM[lx][ly]==true) {
                  temp = AlterTable(temp, rx, ry, this.state.Selected_Fraction);
                }  
              }
              else if(this.state.brush==2)
              {
                if (this.brushH[lx][ly]==true) {
                  temp = AlterTable(temp, rx, ry, this.state.Selected_Fraction);
                }  
                
              }
              
            }
            lx+=1;
            ly=-1;
          }
        }
        

        this.setState({array : temp,});
      }
    }
  }
  
  ChangeBrush(brush)
  {
    this.setState({brush: brush,});
  }

  render() {
    

    return (
      <div>
        <Pl.Pallete onPallete = {this.onPallete} onChangeBrush={this.ChangeBrush}/>
        <Timer onChange={this.onPallete} onStart={this.Start} onReset={this.Reset} onPause={this.Pause}/>
      
        <div className='position'>
          <div id="board" onMouseLeave={()=>ismousedown=false}>
            {this.state.array.map((items, index)=>{
              return(
                <div key={index}>
                  {items.map((subItem, sIndex)=>{
                    return <Square onClick_Grid={this.onClick_Grid} x={index} y={sIndex} fraction={subItem} />;
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






function Timer(params) {
  
  let pause = true;
  let slide = 1;
  
  function toggle() {
    document.getElementById('timer').classList.toggle('show');
    console.log("toggle");
  }

  function Reset()
  {
    params.onReset();
  }

  function Start()
  {
    document.getElementById('on').classList.toggle('show');
    document.getElementById('off').classList.toggle('show');
    params.onStart();
  }

  function Pause()
  {
    document.getElementById('on').classList.toggle('show');
    document.getElementById('off').classList.toggle('show');
    params.onPause();
  }

  function Change(event)
  {
    params.onChange(event.target.value);
  }
  
  return(
    <div id='timer'>
      <button className='showbutton_timer' onClick={toggle}>{'^'}</button>
      <button onClick={Reset}>{'R'}</button>
      <button id='on' className='show' onClick={Start}>{'S'}</button>
      <button id='off' onClick={Pause}>{'P'}</button>
      <input onChange={Change} type="range" min="1" max="100" className="slider" id="myRange"></input>
    </div>
  );
}


ReactDOM.render(
  <GameMenager/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
