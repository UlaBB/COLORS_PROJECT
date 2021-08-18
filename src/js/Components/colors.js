/* global chroma */

export class Colors {

  constructor(){

    this.getElements();
    this.renderColor();
    this.initSliders();
    this.openCloseSliders();
    this.generateColors();
    this.initLock();
  }

  getElements(){
    this.colorDivs = document.querySelectorAll('.color');
    this.sliders = document.querySelectorAll('input[type=range]');
    this.initialsColors;
    this.currentHexes = document.querySelectorAll('.color h2');
    this.adjustmentBtns = document.querySelectorAll('.adjust');
    this.closeAdjustBtn = document.querySelectorAll('.close-adjustment');
    this.lockBtns = document.querySelectorAll('.lock');
    this.sliderContainer = document.querySelectorAll('.sliders');
    this.generateBtn = document.querySelector('.generate');
    this.lockBtns = document.querySelectorAll('.lock');
  }

  generateHex(){
    const HexColor = chroma.random();
    return HexColor;
  }

  generateColors(){
    this.generateBtn.addEventListener('click', ()=>{
      this.renderColor();
    });
  }

  renderColor(){
    this.initialsColors =[];
    this.colorDivs.forEach(div =>{
      const hexText = div.children[0];
      const randomColor = this.generateHex();

      if(div.classList.contains('locked')){
        this.initialsColors.push(hexText.innerText);
        return;
      }else{
        this.initialsColors.push(chroma(randomColor).hex());
      }


      const icons = div.querySelectorAll('.controls button');


      div.style.backgroundColor = randomColor;
      hexText.innerText = randomColor;

      this.checkContrast(randomColor, hexText);

      for(let icon of icons){
        this.checkContrast(randomColor, icon);
      }

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
        let index = e.target.getAttribute('data-bright')|| e.target.getAttribute('data-hue')|| e.target.getAttribute('data-sat');

        const sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
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

  initLock(){
    this.lockBtns.forEach(btn =>{
      btn.addEventListener('click', (e)=>{
        const index = btn.getAttribute('data-btn');
        this.colorDivs[index].classList.toggle('locked');
        if(this.colorDivs[index].classList.contains('locked')){
          e.target.innerHTML = '<i class="fas fa-lock"></i>';
        }else{
          e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
        }
      });
    });
  }

  openCloseSliders(){
    this.adjustmentBtns.forEach(btn =>{
      btn.addEventListener('click', ()=>{
        const index= btn.getAttribute('data-btn');
        this.openCloseAdjustContainer(index);
      });
    });
  }

  openCloseAdjustContainer(index){
    this.sliderContainer[index].classList.toggle('active');
    this.sliderContainer[index].children[0].addEventListener('click',()=>{
      this.sliderContainer[index].classList.remove('active');
    });
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
      if(slider.name === 'hue'){
        const hueColor = this.initialsColors[slider.getAttribute('data-hue')];
        const hueValue = chroma(hueColor).hsl()[0];
        slider.value = Math.floor(hueValue);
      }
      if(slider.name ==='brighntess'){
        const brightColor = this.initialsColors[slider.getAttribute('data-bright')];
        const brightValue = chroma(brightColor).hsl()[2];
        slider.value = (Math.floor(brightValue * 100)/100);
      }
      if(slider.name ==='saturation'){
        const satColor = this.initialsColors[slider.getAttribute('data-sat')];
        const satValue = chroma(satColor).hsl()[1];
        slider.value = (Math.floor(satValue * 100)/100);
      }
    });
  }

}