
export class Fraction
{
  constructor(color, id)
  {
    this.color = color;
    this.id = id;
  }
}

export let fr_slow = new Fraction("#3498db", -3)
export let fr_fast = new Fraction("#e67e22", -2)
export let fr_black = new Fraction("#373737ff", -1)
export let fr_blank = new Fraction("#fff", 0)
export let fr_one = new Fraction("#f53b57", 1)
export let fr_two = new Fraction("#4bcffa", 2)
export let fr_three = new Fraction("#05c46b", 3)