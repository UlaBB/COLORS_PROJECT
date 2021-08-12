/* global chroma */

export class Colors {

  constructor(){
    this.getElements();
    this.renderColor();
  }

  getElements(){
    this.colorDivs = document.querySelectorAll('.color');
    //this.sliders = document.querySelectorAll('.sliders input');
  }

  generateHex(){
    const HexColor = chroma.random();
    return HexColor;
  }

  renderColor(){
    this.colorDivs.forEach(div =>{
      const hexText = div.children[0];
      const randomColor = this.generateHex();

      div.style.backgroundColor = randomColor;
      hexText.innerText = randomColor;

      this.checkContrast(randomColor, hexText);

      const color = chroma(randomColor);

      const sliders = div.querySelectorAll('.sliders input');

      const hue = sliders[0],
        brightness = sliders[1],
        saturation = sliders[2];


      this.colorizeSliders(color, hue, brightness, saturation);
    });
  }

  checkContrast(color, text){
    const colorLuminance = chroma(color).luminance();
    if(colorLuminance > 0.5){
      text.style.color = 'black';
    }else {
      text.style.color = 'white';
    }
  }

  colorizeSliders(color, hue, brightness, saturation){
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);

    const scaleSat = chroma.scale([noSat, color, fullSat]);

    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
  }

}