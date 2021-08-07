
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type = "range"]');
const currentHexes = document.querySelectorAll('.color h2');
const allSliders = document.querySelectorAll('.sliders input');
const popUp = document.querySelector('.copy-container');
let initialColors;


//Add eventListeners
sliders.forEach(slider =>{
  slider.addEventListener('input', hlsControls);
});

colorDivs.forEach((div, index) => {
  div.addEventListener('change', () => {
    updateTextUI(index);
  });
});

currentHexes.forEach(hex =>{
  hex.addEventListener('click', () =>{
    copyToClipBoard(hex);
  });
});

popUp.addEventListener('transitionend', () =>{
  const popUpBox = popUp.children[0];
  popUp.classList.remove('active');
  popUpBox.classList.remove('active');
});



function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColors() {
  initialColors = [];

  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();
    initialColors.push(chroma(randomColor).hex());

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    checkContrast(randomColor, hexText);

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll('.sliders input');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
  resetInputs();
}

function checkContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function colorizeSliders(color, hue, brightness, saturation) {

  const noSat = color.set('hsl.s', 0);
  const fullSat = color.set('hsl.s', 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  const midBright = color.set('hsl.s', 0.5);
  const scaleBright = chroma.scale(['black', midBright, 'white']);

 //Update input color
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)`;
}

function hlsControls(e){
  const index = e.target.getAttribute('data-bright')|| e.target.getAttribute('data-hue')|| e.target.getAttribute('data-sat');

  let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');

  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const bgColor = initialColors[index];
  console.log(bgColor);

  let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l', brightness.value)
    .set('hsl.h', hue.value);

  colorDivs[index].style.backgroundColor = color;

  colorizeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index){
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector('h2');
  const icons = activeDiv.querySelectorAll('.controls button');

  textHex.innerText = color.hex(); // automatically sets the mode to rgba
  checkContrast(color, textHex);
  for(let icon of icons){
    checkContrast(color, icon);
  }

}

function resetInputs() {
  const sliders = document.querySelectorAll(".sliders input");
  console.log(sliders);
  sliders.forEach((slider) => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      console.log('hueColor:',hueColor);
      const hueValue = chroma(hueColor).hsl()[0];
      console.log(hueValue);
      slider.value = Math.floor(hueValue);
    }
    if (slider.name === "brighntess") {
      const brightColor = initialColors[slider.getAttribute("data-bright")];
      const brightValue = chroma(brightColor).hsl()[2];
      slider.value = Math.floor(brightValue * 100) /100;
    }
    if (slider.name === "saturation") {
      const satColor = initialColors[slider.getAttribute("data-sat")];
      const satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue * 100) /100;
    }
  });
}

function copyToClipBoard(hex){
  const el = document.createElement('textarea');
  el.value = hex.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  const popUpBox = popUp.children[0];
  console.log(popUpBox);
  popUp.classList.add('active');
  popUpBox.classList.add('active');
}

randomColors();