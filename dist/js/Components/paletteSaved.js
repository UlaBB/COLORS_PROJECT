
export class PaletteSaved {
  constructor(object){
    this.object = object;
    this.generatePaletteForLibrary(object);
  }

  generatePaletteForLibrary(object){
    const palette = document.createElement('div');
    palette.classList.add('.customPalette');
    const title = document.createElement('h4');
    title.innerText = object.name;
    const preview = document.createElement('div');
    preview.classList.add('.small-preview');
    object.colors.forEach(color =>{
      const smallDiv = document.createElement('div');
      smallDiv.style.backgroundColor = color;
      preview.appendChild(smallDiv);
    });
    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('.pick-palette-Btn');
    paletteBtn.classList.add(object.nr);
    paletteBtn.innerText='select';

    //Append
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
  }
}