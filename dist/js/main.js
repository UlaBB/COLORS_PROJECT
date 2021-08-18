

import { Colors } from './Components/colors.js';
import { Popup } from './Components/popupContainer.js';
import { SavePallete } from './Components/savePallete.js';


const app ={

  renderColors: function(){
    const color = new Colors;
    console.log(color);
  },

  renderPopupCopy: function(){
    const popUpCopy = new Popup;
    console.log(popUpCopy);
  },

  renderSavePallete: function(){
    const savePallete = new SavePallete;
  },


  init: function(){
    this.renderColors();
    this.renderPopupCopy();
    this.renderSavePallete();
  },
};

app.init();