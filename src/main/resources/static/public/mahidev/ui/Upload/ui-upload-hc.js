import UploadBuilderHc from './uploadBuilder-hc.js';
import UIUploadAbstract from './ui-upload-abstract.js'
export class UIUploadHc extends UIUploadAbstract{

  static ALLOW_UPLOAD_HORS_CONTEXT = 'ALLOW_UPLOAD_HORS_CONTEXT';

  constructor(gedProperties, gedUploadData = UIUploadHc.ALLOW_UPLOAD_HORS_CONTEXT, isNommageActive = false, isFromHamac = false) {
    super(new UploadBuilderHc(gedProperties), gedUploadData, isNommageActive, isFromHamac);
  }

   /**
   * reinitialise le builder et l'input file
   * @param {Boolean} withRefresh true rafraichis les données
   */
  reInit(withRefresh = false){
    this.uploadBuilder.reset();
    document.getElementById("fileElem").value = '';
    if (withRefresh && this._refresh) this._refresh();
    this.counter.finish();
   
  }

}
