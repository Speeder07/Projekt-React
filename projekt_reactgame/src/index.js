import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Grain from './GrainGrow.js';
import * as Fr from './Fractions';
import * as GG from './GrainGrow';
import * as Pl from './Pallete';
export let slow_fast = null;

let timer_scale = 1000;
let ismousedown = false;
let size_x = 20, size_y = 20;
let interval;	
let paused = true;

function Square(props) {
  
  
  function OmMoseDown(e) {
    e.preventDefault();

    if (e.type === "mousedown") {
      ismousedown = true;
    }
    else
    {
      ismousedown = false;
    }
    Send();
  }


  function Send() {
    props.onClick_Grid(props.x, props.y);
 
  }
  return(
    
    <div className="square" key={props.x+"|"+props.y}
     style={ props.grid == true ? { border: "1px solid #373737ff", backgroundColor : props.fraction.color} :{backgroundColor : props.fraction.color}} onMouseEnter={Send} onMouseUp={OmMoseDown} onMouseDown={OmMoseDown}></div>
  )
}

function AlterTable(arr, x, y, content) {
  arr[x][y] = content;
  return arr;
}


function makeArray() {	
  var arr = new Array(size_x);	
  for(var i = 0;i<size_x;i++)	
  {	
    	
    var temp = [];	
    for(var j = 0;j<size_y;j++)	
    {	
      temp.push(Fr.fr_blank);	
    }	
    arr[i]=temp;	
  }	
  return arr	
}

function AddValue(arr, content) {
  arr.push(content);
  return arr;
}


class GameManager extends React.Component{
  
  

  constructor(props) {
    super(props);
    const arr = makeArray(size_x, size_y);

    this.state = {
      array : arr,
      Selected_Fraction : null,
      brush : 0,	
      grid : false,
      history : []
    }

    this.onClick_Grid = this.onClick_Grid.bind(this);
    this.Update = this.Update.bind(this);
    this.onPallete = this.onPallete.bind(this);
    this.Reset = this.Reset.bind(this);
    this.ChangeGrid = this.ChangeGrid.bind(this);
    this.ChangeBrush = this.ChangeBrush.bind(this);
    this.onGenerate = this.onGenerate.bind(this);
    this.Change = this.Change.bind(this);
    this.CangeHistory = this.CangeHistory.bind(this);

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

  componentDidMount(){
    this.SetInterval();
  }


  Update() {
    let temp_array =JSON.parse(JSON.stringify(this.state.array));

    if(!paused)
    {
      for (let x = 0; x < size_x; x++) {	
        for (let y = 0; y < size_y; y++) {	
          if (this.state.array[x]===undefined) 	
            continue;	
            
          if (this.state.array[x][y]===undefined) 	
            continue;	

          if (this.state.array[x][y].id!=-1 && this.state.array[x][y].id<=0) {	
            {
              if (!GG.Rule01(this.state.array,temp_array, x, y)) 	
                if (!GG.Rule02(this.state.array,temp_array, x, y))  	
                  if (!GG.Rule03(this.state.array,temp_array, x, y))  	
                    GG.Rule04(this.state.array,temp_array, x, y);
              
              
            }
          }	
        }	
      }
      this.setState({array : temp_array,});
      let hisT = AddValue(this.state.history, this.state.array);
      this.setState({history : hisT,});	
      
    }
  }
  

  onGenerate(nx, ny)	
  {	
    	
    size_x=nx;	
    size_y=ny;	
    const arr = makeArray(nx, size_y);	
    this.setState({array : arr,});	
    let hisT = AddValue(this.state.history, this.state.array);
    this.setState({history : hisT,});	
    	
  }	

  SetInterval()	
  {	
    interval = setInterval(this.Update, timer_scale);	
  }	

  onPallete(frac){this.setState({Selected_Fraction : frac,});}

  onTimer(value) 
  {
    console.log(value);
  }

  Reset()
  {
    const arr = makeArray(size_x, size_y);
    this.setState({array : arr,});
    let hisT = AddValue(this.state.history, this.state.array);
    this.setState({history : hisT,});	
  }

  Start()
  {
    paused = false;
    console.log("Started");
  }

  Pause()
  {
    paused = true;
    console.log("Paused");
  }

  Change(input)
  {
    timer_scale = input * 1000;
    clearInterval(interval);
    this.SetInterval();
  }

  onClick_Grid(x, y) 
  {
    

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
        let hisT = AddValue(this.state.history, temp);
        this.setState({history : hisT,});	
      }
    }
  }
  
  ChangeBrush(brush)
  {
    this.setState({brush: brush,});
  }

  ChangeGrid()	
  {	
    
    this.setState({grid: !this.state.grid,});	
  }

  CangeHistory(index)
  {
    
    this.setState({array: this.state.history[index],})
  }

  render() 
  {
    return (
      <div>
        <Pl.Pallete onPallete = {this.onPallete} onChangeBrush={this.ChangeBrush} onGenerate={this.onGenerate} onGrid={this.ChangeGrid}/>
        <Timer onChange={this.Change} onStart={this.Start} onReset={this.Reset} onPause={this.Pause}/>
        <Revert history={this.state.history} CangeHistory={this.CangeHistory}/>
      
        <div className='position'>
          <div id="board" onMouseLeave={()=>ismousedown=false} style={{gridTemplateColumns: 'repeat('+size_x+', 1fr'}}>
            {this.state.array.map((items, index)=>{
              return(
                <div key={index} style={{gridTemplateRows: 'repeat('+size_y+', 1fr)'}}>
                  {items.map((subItem, sIndex)=>{
                    return <Square grid={this.state.grid} onClick_Grid={this.onClick_Grid} x={index} y={sIndex} fraction={subItem} grid={this.state.grid}/>;
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

function Revert(param)
{
  let pause = true;
  let slide = 1;
  
  function toggle() {
    document.getElementById('revert').classList.toggle('show');
  }

  function OnClick(value) {
    console.log(value);
    param.CangeHistory(value);
  }

  return(
    <div  id="revert">
      <button className='showbutton_revert' onClick={toggle}><i className="fas fa-clipboard-list"></i></button>
      <div className='revert_container'>
        {param.history.map((items, index)=>{
          return(<RevertButton index={index} onClick={OnClick}></RevertButton>);
          })}
      </div>
    </div>
  );
}

function RevertButton(params) {
  return(
    <div><button onClick={()=>{params.onClick(params.index)}}><i className="fas fa-save"></i> Save#{params.index}</button></div>
  )
}

function Timer(params) 
{
  const [time_scale, set_time_scale] = useState(()=>{return 1000});
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
    set_time_scale(event.target.value);
    params.onChange(event.target.value);
  }
  
  return(
    <div id='timer'>
      <button className='showbutton_timer' onClick={toggle}><i className="fas fa-clock"></i></button>
      <div className='time_container'>
        
        <button id='reset' className='reset_button' onClick={Reset}><i className="fas fa-power-off"></i></button>
        <button id='on' className='show on_button' onClick={Start}><i className="fas fa-play"></i></button>
        <button id='off' className="off_button" onClick={Pause}><i className="fas fa-pause"></i></button>
        <input onChange={Change} type="range" min="0.1" max="5" step="0.1" defaultValue="1" className="slider" id="myRange"></input>
        <input id="speed_display" value={timer_scale/1000} type="text" readOnly></input>
      </div>
    </div>
  );
}


ReactDOM.render(
  <GameManager/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
