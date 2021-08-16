/* global chroma */

export class Colors {

  constructor(){

    this.getElements();
    this.renderColor();
    this.initSliders();
    this.initCopyClipboard();
  }

  getElements(){
    this.colorDivs = document.querySelectorAll('.color');
    this.sliders = document.querySelectorAll('input[type=range]');
    this.initialsColors;
    this.currentHexes = document.querySelectorAll('.color h2');
    this.popUp = document.querySelector('.copy-container');
  }

  generateHex(){
    const HexColor = chroma.random();
    return HexColor;
  }

  renderColor(){

    this.initialsColors =[];

    this.colorDivs.forEach(div =>{
      const hexText = div.children[0];
      const randomColor = this.generateHex();

      this.initialsColors.push(chroma(randomColor).hex());

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

    this.resetInputs();
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

    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(['black', midBright, 'white']);

    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%)`;
  }

  initSliders(){

    this.sliders.forEach(slider =>{
      slider.addEventListener('input', (e)=>{
        const index = e.target.getAttribute('data-bright')|| e.target.getAttribute('data-hue')|| e.target.getAttribute('data-sat');

        let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];


        const bgColor = this.initialsColors[index];

        let color = chroma(bgColor)
          .set('hsl.s', saturation.value)
          .set('hsl.l', brightness.value)
          .set('hsl.h', hue.value);
        this.colorDivs[index].style.backgroundColor = color;

        this.colorizeSliders(color, hue, saturation, brightness);
      });
    });

    this.colorDivs.forEach((div, index)=>{
      div.addEventListener('change', ()=>{
        this.updateTextUi(index);
      });
    });
  }

  initCopyClipboard(){
    this.currentHexes.forEach(hex =>{
      hex.addEventListener('click', ()=>{
        this.copyToClipBoard(hex, this.popUp);
      });
    });
  }

  copyToClipBoard(hex, popUp){
    const el = document.createElement('textarea');
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const popUpBox = popUp.children[0];
    popUp.classList.add('active');
    popUpBox.classList.add('active');
  }

  updateTextUi (index) {
    const activeDiv = this.colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');

    textHex.innerText = color.hex();

    this.checkContrast(color, textHex);
    for(let icon of icons){
      this.checkContrast(color, icon);
    }
  }

  resetInputs(){
    const sliders = document.querySelectorAll('.sliders input');
    sliders.forEach(slider =>{
      if(slider.name === "hue"){
        const hueColor = this.initialsColors[slider.getAttribute("data-hue")];
        const hueValue = chroma(hueColor).hsl()[0];
        slider.value = Math.floor(hueValue);
      }
      if(slider.name ==="brighntess"){
        const brightColor = this.initialsColors[slider.getAttribute("data-bright")];
        const brightValue = chroma(brightColor).hsl()[2];
        slider.value = (Math.floor(brightValue * 100)/100);
      }
      if(slider.name ==="saturation"){
        const satColor = this.initialsColors[slider.getAttribute("data-sat")];
        const satValue = chroma(satColor).hsl()[1];
        slider.value = (Math.floor(satValue * 100)/100);
      }
    });
  }

}