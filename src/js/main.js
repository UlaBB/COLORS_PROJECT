

import { Colors } from './Components/colors.js';
import { Popup } from './Components/popupContainer.js';


const app ={

  renderColors: function(){
    const color = new Colors;
  },

  renderPopupCopy: function(){
    const popUpCopy = new Popup;
  },


  init: function(){
    this.renderColors();
    this.renderPopupCopy();
  },
};

app.init();