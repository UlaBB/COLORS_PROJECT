import { Colors } from './colors.js';


 
export class SavePallete{
  constructor(){
    
    this.getElements();
    this.initSavePallete();
  }

  getElements(){
    this.saveBtn = document.querySelector('.save');
    this.saveContainer = document.querySelector('.save-container');
    this.popUp = document.querySelector('.save-popup');
    this.closeSaveContainer = document.querySelector('.close-save');
    this.savePaletteBtn = document.querySelector('.submit-save');
    this.saveInput = document.querySelector('.save-popup input');
    this.currentHexes = document.querySelectorAll('.color h2');
    this.savedPalettes= [];
    this.colorDivs = document.querySelectorAll('.color');

    this.libraryContainer = document.querySelector('.library-container');
    this.libraryBtn = document.querySelector('.library');
    this.libraryCloseBtn = document.querySelector('.library-close');
    this.libraryPopup = document.querySelector('.library-popup');
  }

  initSavePallete(){
    this.saveBtn.addEventListener('click', ()=>{
      this.openCloseSaveContainer();
    });

    this.savePaletteBtn.addEventListener('click', (e)=>{
      this.savePalette(e);
    });
  }

  openCloseSaveContainer(){
    this.saveContainer.classList.add('active');
    this.popUp.classList.add('active');
    this.closeSaveContainer.addEventListener('click', ()=>{
      this.saveContainer.classList.remove('active');
      this.popUp.classList.remove('active');
    });
  }

  savePalette(e){

    this.saveContainer.classList.remove('active');
    this.popUp.classList.remove('active');

    const name = this.saveInput.value;
    const colors = [];
    this.currentHexes.forEach(hex=>{
      colors.push(hex.innerText);
    });

    //Generate object
    let paletteNr = this.savedPalettes.length;
    const paletteObj = { name, colors, nr: paletteNr};
    this.savedPalettes.push(paletteObj);
    console.log('savedPalettes',this.savedPalettes);// tablica z zapisanymi paletami

    //Save to LocalStorage
    this.saveToLocal(paletteObj);
    this.saveInput.value = '';

    //Generate the palette for library
    //this.generatePaletteForLibrary();

    const newSavedPalette= this.generatePaletteForLibrary(paletteObj);

    this.libraryContainer.children[0].appendChild(newSavedPalette);
  }

  generatePaletteForLibrary(object){
    const palette = document.createElement('div');
    palette.classList.add('customPalette');
    const title = document.createElement('h4');
    title.innerText = object.name;
    const preview = document.createElement('div');
    preview.classList.add('preview');
    object.colors.forEach(color =>{
      const smallDiv = document.createElement('div');
      smallDiv.style.backgroundColor = color;
      preview.appendChild(smallDiv);
    });
    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-paletteBtn');
    paletteBtn.classList.add(object.nr);
    paletteBtn.innerText='select';


    paletteBtn.addEventListener('click', e=>{
      this.libraryContainer.classList.remove('active');
      const paletteIndex = e.target.classList[1];
    
      const initialsColors= [];
      this.savedPalettes[paletteIndex].colors.forEach((color,index)=>{
        initialsColors.push(color);
        this.colorDivs[index].style.backgroundColor = color;
        const text= this.colorDivs[index].children[0];
        
        
        this.updateTextUi(index);
      });
    });
    //Append
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);

    return palette;
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

  checkContrast(color, text){
    const colorLuminance = chroma(color).luminance();
    if(colorLuminance > 0.5){
      text.style.color = 'black';
    }else {
      text.style.color = 'white';
    }
  }
  
  saveToLocal(paletteObj){
    let localPalettes;

    if(localStorage.getItem('palettes')===null){
      localPalettes =[];
    }else{
      localPalettes= JSON.parse(localStorage.getItem('palettes'));
    }
    localPalettes.push(paletteObj);
    localStorage.setItem('palettes', JSON.stringify(localPalettes));
  }

  // generatePaletteForLibrary(paletteObj){
  //   const palette = document.createElement('div');
  //   palette.className.add('.customPalette');
  //   const title = document.createElement('h4');
  //   title.innerText = paletteObj.name;
  //   const preview = document.createElement('div');
  //   preview.classList.add('.small-preview');
  //   paletteObj.colors.forEach(color =>{
  //     const smallDiv = document.createElement('div');
  //     smallDiv.style.backgroundColor = color;
  //     preview.appendChild(smallDiv);
  //   });
  //   const paletteBtn = document.createElement('button');
  //   paletteBtn.classList.add('.pick-palette-Btn');
  //   paletteBtn.classList.add(paletteObj.nr);
  //   paletteBtn.innerText='select';

  //   //Append
  //   palette.appendChild(title);
  //   palette.appendChild(preview);
  //   palette.appendChild(paletteBtn);
  // }
}