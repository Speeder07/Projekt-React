import * as Fr from './Fractions';
import {useState} from 'react';
import flag_img from './images/flag.svg';
import mountain_img from './images/mountain.svg';
import slow_img from './images/slow.svg';
import speed_img from './images/speed.svg';
import brush_img from './images/brush.svg';
import eraser_img from './images/eraser.svg';
export let GlobalRandom = 50;
export function Pallete(params) {

    const [Fract_first, setFract_first] = useState(()=>{return Fr.fr_blank});
    const [brush, setbrush] = useState(()=>{return 0});

    

    function toggle(name) {
      document.getElementById(name).classList.toggle('show');
      console.log("toggle");
    }
    
    function ColorUpdate(fract) {
      setFract_first(fract);
      params.onPallete(fract);
    }

    function ChangeBrush() {
      let temp = brush;
      if (temp==2) 
      {
        temp=0;
      }
      else
      {
        temp++;
      }
      params.onChangeBrush(temp);
      setbrush(temp);
    }

    function OnGenerate(e) {
      e.preventDefault();
      let x = document.getElementById('input_x').value;
      let y = document.getElementById('input_y').value;
      params.onGenerate(x, y)
    }

    function OnChanceChange(e) {
      e.preventDefault();
      GlobalRandom = document.getElementById('chance_input').value;
    }

    function OnGrid(e) {
      e.preventDefault();
      params.OnGrid();
    }
    
  
    let color = Fract_first.color;
    
    return(
      <div id='pallete'>
        <button className='showbutton_pallete' onClick={() => toggle('pallete')}>{'>'}</button>
        
        <div className='pallete_container'>
          <button style={{backgroundColor : color}} className='pallete_button' onClick={()=> {toggle('colorPicker')}}><img src={flag_img} height="30px" width="30px"/></button>
          <button onClick={()=>params.onPallete(Fr.fr_black)} className='pallete_button'><img src={mountain_img} height="30px" width="30px"/></button>
          <button onClick={()=>params.onPallete(Fr.fr_slow)} className='pallete_button'><img src={slow_img} height="30px" width="30px"/></button>
          <button onClick={()=>params.onPallete(Fr.fr_fast)} className='pallete_button'><img src={speed_img} height="30px" width="30px"/></button>
          <button onClick={ChangeBrush} className='pallete_button'><img src={brush_img} height="30px" width="30px"/></button>
          <div>{(brush==0)?"S":(brush==1)?"M":"H"}</div>
          <button onClick={()=>params.onPallete(Fr.fr_blank)} className='pallete_button'><img src={eraser_img} height="30px" width="30px"/></button>
          <div></div>
          <div>
            <input id='input_x' min={1} type={Number} ></input>
            <input id='input_y' min={1} type={Number} ></input>
          </div>
          <button onClick={OnGenerate} className='pallete_button'>Generate</button>
          <div>
            <input id='chance_input' min={0} max={100} type={Number}></input>
          </div>
          <button onClick={OnChanceChange} className='pallete_button'>%</button>
          <div>
          <input></input>
          </div>
          <button onClick={()=>params.onPallete(Fr.fr_blank)} className='pallete_button'>F</button>
          <button onClick={()=>params.onPallete(Fr.fr_blank)} className='pallete_button'>#</button>
          <button onClick={()=>params.onPallete(Fr.fr_blank)} className='pallete_button'>I</button>
        </div>
        <ColorPicker colorUpdate={ColorUpdate} />
      </div>
    );
}

function ColorPicker(params) {
    return(
      <div id='colorPicker'>
        <button onClick={()=> params.colorUpdate(Fr.fr_one)} style={{backgroundColor: Fr.fr_one.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_two)} style={{backgroundColor: Fr.fr_two.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_three)} style={{backgroundColor: Fr.fr_three.color}}></button>
      </div>
    );
}
