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
    console.log(e.target);
    this.saveContainer.classList.remove('active');
    this.popUp.classList.remove('active');

    const name = this.saveInput.value;
    console.log(name);
    const colors = [];
    this.currentHexes.forEach(hex=>{
      colors.push(hex.innerText);
    });
    console.log(colors);

    //Generate object
    let paletteNr = this.savedPalettes.length;
    const paletteObj = { name, colors, nr: paletteNr};
    this.savedPalettes.push(paletteObj);
    console.log(this.savedPalettes);

    //Save to LocalStorage
    this.saveToLocal(paletteObj);
    this.saveInput.value = '';
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
}