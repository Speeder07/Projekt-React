import * as Fr from './Fractions';
import {useState} from 'react';

export let GlobalRandom = 50;
export let slow_chance = 20;
export let fast_chance = 80;
export function Pallete(params) {

    const [Fract_first, setFract_first] = useState(()=>{return Fr.fr_blank});
    const [brush, setbrush] = useState(()=>{return 0});

    

    function toggle(name) {
      document.getElementById(name).classList.toggle('show');
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
      x = (x<1)?1:x;
      y = (y<1)?1:y;
      params.onGenerate(x, y)
    }

    function OnChanceChange(e) {
      e.preventDefault();
      let temp = document.getElementById('chance_input').value;
      temp = (temp<1)?1:(temp>100)?100:temp;
      GlobalRandom = temp;
    }

    function OnGrid(e) {
      e.preventDefault();
      params.onGrid();
      document.getElementById('grid_button').classList.toggle('activated');
    }

    function OnFast(value) {
      value = (value<1)?1:(value>100)?100:value;
      console.log("f"+value);
      fast_chance = value;
    }

    function OnSlow(value) {
      value = (value<1)?1:(value>100)?100:value;
      console.log("s"+value);
      slow_chance = value;
    }
    
  
    let color = Fract_first.color;
    
    return(
      <div id='pallete'>
        <button className='showbutton_pallete' onClick={() => toggle('pallete')}><i class="fas fa-palette"></i></button>
        
        <div className='pallete_container'>
          <button style={{color : color}} className='frac_button' onClick={()=> {toggle('colorPicker'); params.onPallete(Fract_first);}}><i class="fas fa-flag"></i></button>
          <button onClick={()=>params.onPallete(Fr.fr_black)} className='barrier_button'><i class="fas fa-shield-alt"></i></button>
          <button onClick={()=>{params.onPallete(Fr.fr_slow); toggle('SlowPick')}} className='slow_button'><i class="fas fa-angle-double-left"></i></button>
          <button onClick={()=>{params.onPallete(Fr.fr_fast); toggle('FastPick')}} className='speed_button'><i class="fas fa-angle-double-right"></i></button>
          <button onClick={ChangeBrush} className='brush_button'><i class="fas fa-paint-brush"></i></button>
          <div className='brush_display'>{(brush==0)?<i class="fas fa-highlighter"></i>:(brush==1)?<i class="fas fa-paint-roller"></i>:<i class="fas fa-brush"></i>}</div>
          <button onClick={()=>params.onPallete(Fr.fr_blank)} className='eraser_button'><i class="fas fa-eraser"></i></button>
          <button id='grid_button' onClick={OnGrid} className='grid_button'><i class="fas fa-border-all"></i></button>
          <form className='world_generator' onSubmit={OnGenerate}>
            <div className='generate_div'>
              <input className='world_gen_input' id='input_x' min="1" type="Number" placeholder='X'></input>
              <input className='world_gen_input' id='input_y' min="1" type="Number" placeholder='Y'></input>
            </div>
            <button type='submit' className='world_generator_button'><i class="fas fa-globe-europe"></i></button>
          </form>
          <div className='chance_div'>
            <input id='chance_input' min={0} max={100} type={Number} placeholder='%'></input>
          </div>
          <button onClick={OnChanceChange} className='chance_button'><i class="fas fa-percent"></i></button>

        </div>
        <ColorPicker colorUpdate={ColorUpdate} />
        <SlowPick OnSlow={OnSlow}/>
        <FastPick OnFast={OnFast}/>
      </div>
    );
}

function ColorPicker(params) {
    return(
      <div id='colorPicker'>
        <button onClick={()=> params.colorUpdate(Fr.fr_one)} style={{backgroundColor: Fr.fr_one.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_two)} style={{backgroundColor: Fr.fr_two.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_three)} style={{backgroundColor: Fr.fr_three.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_four)} style={{backgroundColor: Fr.fr_four.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_five)} style={{backgroundColor: Fr.fr_five.color}}></button>
        <button onClick={()=> params.colorUpdate(Fr.fr_six)} style={{backgroundColor: Fr.fr_six.color}}></button>
      </div>
    );
}

function SlowPick(params) {

  

  function OnChange(e) {
    e.preventDefault();
    params.OnSlow(e.target.value);
  }

  return(
    <div id='SlowPick'>
      <input onChange={OnChange} placeholder='Slow %'></input>
    </div>
  );
}

function FastPick(params) {


  function OnChange(e) {
    e.preventDefault();
    params.OnFast(e.target.value);
  }

  return(
    <div id='FastPick'>
      <input onChange={OnChange} placeholder='Fast %'></input>
    </div>
  );
}
