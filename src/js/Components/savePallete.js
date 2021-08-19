// /* global chroma */
// import { Colors } from "./colors.js";

 
// export class SavePallete{
//   constructor(){

//     this.getElements();
//     this.initSavePallete();
//     this.getLocal();

//   }

//   getElements(){
//     this.saveBtn = document.querySelector('.save');
//     this.saveContainer = document.querySelector('.save-container');
//     this.popUp = document.querySelector('.save-popup');
//     this.closeSaveContainer = document.querySelector('.close-save');
//     this.savePaletteBtn = document.querySelector('.submit-save');
//     this.saveInput = document.querySelector('.save-popup input');
//     this.currentHexes = document.querySelectorAll('.color h2');
//     this.savedPalettes= [];
//     this.colorDivs = document.querySelectorAll('.color');
//     this.paletteBtns = document.querySelectorAll('.pick-paletteBtn');
//     console.log(this.paletteBtn);

//     this.libraryContainer = document.querySelector('.library-container');
//     this.libraryBtn = document.querySelector('.library');
//     this.libraryCloseBtn = document.querySelector('.library-close');
//     this.libraryPopup = document.querySelector('.library-popup');
    
//   }

//   initSavePallete(){
//     this.saveBtn.addEventListener('click', ()=>{
//       this.openCloseSaveContainer();
//     });

//     this.savePaletteBtn.addEventListener('click', (e)=>{
//       this.savePalette(e);
//     });
//   }

//   checkSavedPallete (btn){
//     btn.addEventListener('click', e=>{
//       this.libraryContainer.classList.remove('active');
//       const paletteIndex = e.target.classList[1];
//       const initialsColors= [];
//       this.savedPalettes[paletteIndex].colors.forEach((color,index)=>{
//         initialsColors.push(color);
//         this.colorDivs[index].style.backgroundColor = color;
//         const text= this.colorDivs[index].children[0];
//         console.log(text);
//         this.updateTextUi(index);
        
//       });
//       console.log(initialsColors);
//       this.resetInputs(initialsColors);
//     });
//   }

//   openCloseSaveContainer(){
//     this.saveContainer.classList.add('active');
//     this.popUp.classList.add('active');
//     this.closeSaveContainer.addEventListener('click', ()=>{
//       this.saveContainer.classList.remove('active');
//       this.popUp.classList.remove('active');
//     });
//   }

//   savePalette(){

//     this.saveContainer.classList.remove('active');
//     this.popUp.classList.remove('active');

//     const name = this.saveInput.value;
//     const colors = [];
//     this.currentHexes.forEach(hex=>{
//       colors.push(hex.innerText);
//     });

//     //Generate object
//     let paletteNr = this.savedPalettes.length;
//     const paletteObj = { name, colors, nr: paletteNr};
//     this.savedPalettes.push(paletteObj);
//     console.log('savedPalettes',this.savedPalettes);// tablica z zapisanymi paletami

//     //Save to LocalStorage
//     this.saveToLocal(paletteObj);
//     this.saveInput.value = '';

//     //Generate the palette for library
//     //this.generatePaletteForLibrary();

//     const newSavedPalette= this.generatePaletteForLibrary(paletteObj);

//     this.libraryContainer.children[0].appendChild(newSavedPalette);

    
//   }

//   generatePaletteForLibrary(object){
//     const palette = document.createElement('div');
//     palette.classList.add('customPalette');
//     const title = document.createElement('h4');
//     title.innerText = object.name;
//     const preview = document.createElement('div');
//     preview.classList.add('preview');
//     object.colors.forEach(color =>{
//       const smallDiv = document.createElement('div');
//       smallDiv.style.backgroundColor = color;
//       preview.appendChild(smallDiv);
//     });
//     this.paletteBtn = document.createElement('button');
//     this.paletteBtn.classList.add('pick-paletteBtn');
//     this.paletteBtn.classList.add(object.nr);
//     this.paletteBtn.innerText='select';

//     this.checkSavedPallete(this.paletteBtn);
//     //Append
//     palette.appendChild(title);
//     palette.appendChild(preview);
//     palette.appendChild(this.paletteBtn);

//     return palette;
//   }

//   updateTextUi (index) {
//     const activeDiv = this.colorDivs[index];
//     const color = chroma(activeDiv.style.backgroundColor);
//     const textHex = activeDiv.querySelector('h2');
//     const icons = activeDiv.querySelectorAll('.controls button');

//     textHex.innerText = color.hex();

//     this.checkContrast(color, textHex);
//     for(let icon of icons){
//       this.checkContrast(color, icon);
//     }
//   }

//   checkContrast(color, text){
//     const colorLuminance = chroma(color).luminance();
//     if(colorLuminance > 0.5){
//       text.style.color = 'black';
//     }else {
//       text.style.color = 'white';
//     }
//   }

//   saveToLocal(paletteObj){
//     let localPalettes;

//     if(localStorage.getItem('palettes')===null){
//       localPalettes =[];
//     }else{
//       localPalettes= JSON.parse(localStorage.getItem('palettes'));
//     }
//     localPalettes.push(paletteObj);
//     localStorage.setItem('palettes', JSON.stringify(localPalettes));
//   }

//   resetInputs(initialsColors){
//     const sliders = document.querySelectorAll('.sliders input');
//     sliders.forEach(slider =>{
//       if(slider.name === 'hue'){
//         const hueColor = initialsColors[slider.getAttribute('data-hue')];
//         const hueValue = chroma(hueColor).hsl()[0];
//         slider.value = Math.floor(hueValue);
//       }
//       if (slider.name === 'brightness') {
//         const brightColor = initialsColors[slider.getAttribute('data-bright')]
//         const brightValue = chroma(brightColor).hsl()[2];
//         slider.value = Math.floor(brightValue * 100) / 100;
//       }
//       if(slider.name ==='saturation'){
//         const satColor = initialsColors[slider.getAttribute('data-sat')];
//         const satValue = chroma(satColor).hsl()[1];
//         slider.value = (Math.floor(satValue * 100)/100);
//       }
//     });
//   }

//   getLocal(){
//     if(localStorage.getItem('palettes')===null){
//       localStorage = [];
//     }else{
//       const paletteObj = JSON.parse(localStorage.getItem('palettes'));
//       paletteObj.forEach(palette =>{
//         this.generatePaletteForLibrary(palette);
//       });
//     }
//   }
// }