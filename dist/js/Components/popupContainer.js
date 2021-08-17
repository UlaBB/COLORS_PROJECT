
export class Popup {
  
  constructor(){
    this.getElements();
    this.initCopyClipboard();
    this.closeCopyPopup();
  }

  getElements(){
    this.currentHexes = document.querySelectorAll('.color h2');
    this.popUp = document.querySelector('.copy-container');
  }

  initCopyClipboard(){
    this.currentHexes.forEach(hex =>{
      hex.addEventListener('click', ()=>{
        this.copyToClipBoard(hex, this.popUp);
      });
    });
  }

  closeCopyPopup(){
    this.popUp.addEventListener('transitionend', ()=>{
      const popUpBox = this.popUp.children[0];
      this.popUp.classList.remove('active');
      popUpBox.classList.remove('active');
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

}