import UploadBuilder from './uploadBuilder.js';
import UIUploadAbstract from './ui-upload-abstract.js';


export class UIUpload extends UIUploadAbstract{

  constructor(gedUploadData, isNommageActive, isFromHamac = false) {
    super(new UploadBuilder(), gedUploadData, isNommageActive, isFromHamac);
  }

  /**
   * reinitialise le builder et l'input file
   * @param {Boolean} withRefresh true rafraichis les données
   */
  reInit(withRefresh = false){
        this.uploadBuilder.initializeHandler(true); // removeListener
        this.uploadBuilder = new UploadBuilder();
        document.getElementById("fileElem").value = '';
        if (withRefresh && this._refresh) this._refresh();
        this.counter.finish();
  }

}
