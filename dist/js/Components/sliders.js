import { Colors } from './Components/colors.js';

export class Sliders{
  constructor(){
    this.getElement();
  }

  getElement(){
    this.sliders = Colors.getElement.div.querySelectorAll('.sliders input');
    console.log(this.sliders);
  }
}