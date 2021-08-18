/* global chroma */

export const utils={};


utils.checkContrast = function(color, text){
  const colorLuminance = chroma(color).luminance();
  if(colorLuminance > 0.5){
    text.style.color = 'black';
  }else {
    text.style.color = 'white';
  }
};