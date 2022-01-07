import * as Fr from './Fractions';

class Counter
{
  constructor(fraction, count)
  {
    this.fraction = fraction;
    this.count = count;
  }
}


export function Rule01(array, temp_array, sx, sy) {
    
    let tab = new Array(0);

    for (let x = sx-1; x <= sx+1; x++) {
      for (let y = sy-1; y <= sy+1; y++) {

        if (x == sx && y == sy) 
          continue;
        
        if (array[x]===undefined) 
          continue;
        
        if (array[x][y]===undefined) 
          continue;
  
        if (array[x][y].id > 0) 
        {
            let asigned = false;
            tab.forEach(element => {
              if (element.fraction.id === array[x][y].id) {
                element.count += 1;
                asigned = true;
              }
            });
            if (!asigned) {
              tab.push(new Counter(array[x][y], 1));
              
            }
        }
      }
      
    }
    if (tab.length != 0) {
        let max = tab[0];
        for (const element of tab) {
          if (element.count > max.count) {
            max = element;
          }
        }
        if (max.count >= 5) {
            temp_array[sx][sy] = max.fraction;
            return true;
        }
    }
    return false;
}

export function Rule02(array, temp_array, sx, sy) {
    
    let tab = new Array(0);

    for (let x = sx-1; x <= sx+1; x++) {
      for (let y = sy-1; y <= sy+1; y++) {
        
        if (x != sx && y != sy) 
            continue;

        if (x == sx && y == sy) 
            continue;
        
        if (array[x]===undefined) 
            continue;
        
        if (array[x][y]===undefined) 
            continue;
  
        if (array[x][y].id > 0) 
        {
            let asigned = false;
            tab.forEach(element => {
              if (element.fraction.id === array[x][y].id) {
                element.count += 1;
                asigned = true;
              }
            });
            if (!asigned) {
              tab.push(new Counter(array[x][y], 1));
            }
        }
      }
    }
    if (tab.length != 0) {
        let max = tab[0];
        for (const element of tab) {
          if (element.count > max.count) {
            max = element;
          }
        }
        if (max.count >= 3) {
            temp_array[sx][sy] = max.fraction;
        }
    }
}

export function Rule03(array, temp_array, sx, sy) {
    
    let tab = new Array(0);

    for (let x = sx-1; x <= sx+1; x++) {
      for (let y = sy-1; y <= sy+1; y++) {

        if (x == sx || y == sy) 
        continue;

        if (array[x]===undefined) 
          continue;
        
        if (array[x][y]===undefined) 
          continue;
  
        if (array[x][y].id > 0) 
        {
            let asigned = false;
            tab.forEach(element => {
              if (element.fraction.id === array[x][y].id) {
                element.count += 1;
                asigned = true;
              }
            });
            if (!asigned) {
              tab.push(new Counter(array[x][y], 1));
            }
        }
      }
    }
    if (tab.length != 0) {
        let max = tab[0];
        for (const element of tab) {
          if (element.count > max.count) {
            max = element;
          }
        }
        if (max.count >= 3) {
            temp_array[sx][sy] = max.fraction;
        }
    }
}

export function Rule04(array, temp_array, sx, sy) {
    
    let tab = new Array(0);

    for (let x = sx-1; x <= sx+1; x++) {
      for (let y = sy-1; y <= sy+1; y++) {

        if (x == sx && y == sy) 
          continue;
        
        if (array[x]===undefined) 
          continue;
        
        if (array[x][y]===undefined) 
          continue;
  
        if (array[x][y].id > 0) 
        {
            let asigned = false;
            tab.forEach(element => {
              if (element.fraction.id === array[x][y].id) {
                element.count += 1;
                asigned = true;
              }
            });
            if (!asigned) {
              tab.push(new Counter(array[x][y], 1));
            }
        }
      }
    }
    if (tab.length != 0) {
        let max = tab[0];
        for (const element of tab) {
          if (element.count > max.count) {
            max = element;
          }
        }
        if (Math.floor(Math.random() * 101) <= 20 ) {
            temp_array[sx][sy] = max.fraction;
        }
    }
}