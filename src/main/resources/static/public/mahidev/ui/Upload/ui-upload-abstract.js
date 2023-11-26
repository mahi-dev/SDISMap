import {ErrorModal} from '../Dialog/error-modal.js';
import UploadCounter from '../../service/uploadCounter.js'
export default class UIUploadAbstract {

  set refresh(value){
    this._refresh = value;
  }

  constructor(uplaoadBuilder, gedUploadData, isNommageActive, isFromHamac) {
    this.uploadBuilder = uplaoadBuilder;
    this.gedUploadData = gedUploadData;
    this.isNommageActive = isNommageActive;
    this.isFromHamac = isFromHamac;
    this.errorModal = new ErrorModal();
    this.counter = new UploadCounter().getInstance();
    this.dragNdropListeners();
  }

  submit() {
    this.removeModal('multiuploadmodal');
    document.querySelector('.spinner').classList.remove('invisible');

    const upload = this._isHorsContext() ? 
      this.uploadBuilder.fileUploadCollection.uploadAllAsync(): 
      this.isNommageActive ? 
      this.uploadBuilder.fileUploadCollection.applyAllNamingAsyncAndUpload():
      this.uploadBuilder.fileUploadCollection.uploadAllAsync();

    upload.finally( ()=>{
        this.reInit(true);
    })
    .catch((err)=>{
      let title = 'Erreur inattendue'
      let message = "Erreur lors de l'ajout en GED : Erreur " + err.status;
      this.errorModal.createErrorModal(title, message);
      console.error(err)
    });
  }

  dragNdropListeners(){
    // ************************ Drag and drop ***************** //
    let dropArea = document.getElementById("drop-area");
        dropArea.style.visibility = "visible";

    const preventDefaults = (e) =>{
      e.preventDefault()
      e.stopPropagation()
    }

      const highlight = (e) =>{
      dropArea.classList.add('highlight')
    }

    const unhighlight = (e) =>{
      dropArea.classList.remove('highlight')
    }

    const  handleDrop = (e) =>{
      this.files = e.dataTransfer.files;
      this.showModal();
    }

    const  handleFiles = (files) =>{
      this.files = [...files.target.files]
      this.showModal();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)   
      document.body.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false)
    });

    dropArea.addEventListener('drop', handleDrop, false)

    let parcourir = document.getElementById("fileElem");
    parcourir.addEventListener('change', handleFiles, false)

  }

/********************************* Gestion de la modal d'upload *************************************************/

  /**
   * Création de la modal 
   * @returns {HTMLElement} retourne l'élément html de la modal
   */
  createMultiFileModal() {
    /** MODAL */
    const modaId = 'multiuploadmodal';
    const modal = document.createElement('div');
        modal.setAttribute('id', modaId);
        modal.setAttribute('class', 'modal');
        modal.setAttribute('tabindex', '-2');
        modal.setAttribute('role', 'dialog');

    /** MODAL dialag */      
    const modalDialog = document.createElement('div');
        modalDialog.setAttribute('class',
            'modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg');
        modalDialog.setAttribute('role', 'document');

    /** MODAL content*/
    const modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');

    const modalHeader = document.createElement('div');
        modalHeader.setAttribute('class', 'modal-header');

    /** MODAL title*/    
    const modalTitle = document.createElement('h5');
        modalTitle.setAttribute('class', 'modal-title');
        modalTitle.textContent = 'Ajout Multiple de Documents';

    const docname = document.createElement('h6');
        docname.setAttribute('class', 'modal-title');
        docname.setAttribute('id', 'multidocname');
        docname.textContent = '';
    
    const sizeDoc = document.createElement('pre');
        sizeDoc.setAttribute('id', 'sizeDoc');
        sizeDoc.style.margin = '0 0 0 0'

    const divInfos = document.createElement('div');
        divInfos.style.textAlign = 'right';
        divInfos.appendChild(docname);
        divInfos.appendChild(sizeDoc);

    /** Checkbox appliquer à tous */    
    const applyAllLabel = document.createElement("label");
        applyAllLabel.textContent =  'Appliquer à tous les documents  ';
    const applyAll = document.createElement("INPUT");
        applyAll.setAttribute('id','applyAll')
        applyAll.setAttribute('type', 'checkbox');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(divInfos);
    modalContent.appendChild(modalHeader);

    /** body*/  
    const modalBody = document.createElement('div');
       modalBody.setAttribute('class', 'modal-body');
       modalBody.setAttribute('id','modalBody');

    /** uniquement Hors Context - recherche de metadata */
    if(this._isHorsContext()) {
      const template = document.getElementById('searchMetadata');
      const search = document.importNode(template.content, true);
      modalBody.appendChild(search);
    }
    
    applyAllLabel.appendChild(applyAll);
    modalBody.appendChild(applyAllLabel);

    const row = document.createElement('div');
        row.setAttribute('class', 'row');

    /** Div Gauche avec lien precedent*/     
    const modalright = document.createElement('div');
        modalright.setAttribute('class', 'col-md-1');
        modalright.setAttribute('class', 'hiddenNavigation');     //désactivation temporaire de la navigation fichier '<'
    const aright = document.createElement('a');
        aright.href = '#';
        aright.textContent =  '<';
        aright.setAttribute('style','font-size:50px');
        aright.setAttribute('id','previousDoc');
      modalright.appendChild(aright);

    /** Div Central */      
    const modalcenter = document.createElement('div');
        modalcenter.setAttribute('id','modalCenter');
        modalcenter.setAttribute('class', 'col-md-10');
        modalcenter.setAttribute('style','flex-wrap: wrap;')
    
    /** Div Droite avec lien suivant*/         
    const modalleft = document.createElement('div');
        modalleft.setAttribute('class', 'col-md-1');
        modalleft.setAttribute('class', 'hiddenNavigation');     //désactivation temporaire de la navigation fichier '>'
    const aleft = document.createElement('a');
        aleft.href = '#';
        aleft.textContent =  '>';
        aleft.setAttribute('style','font-size:50px');
        aleft.setAttribute('id','nextDoc');
      modalleft.appendChild(aleft);

    row.appendChild(modalright);
    row.appendChild(modalcenter);
    row.appendChild(modalleft);

    modalBody.appendChild(row);
    modalContent.appendChild(modalBody);

    this.build(modalcenter, this.files, this.gedUploadData);

    const modalFooter = document.createElement('div');
        modalFooter.setAttribute('id', 'uploadModalFooter');
        modalFooter.setAttribute('class', 'modal-footer');

    const nbDoc = document.createElement('pre');
        nbDoc.setAttribute('id', 'nbDoc');
        nbDoc.style.margin = '0 570px 0 0'

    const modalButtonupload = document.createElement('button');
        modalButtonupload.setAttribute('type', 'button');
        modalButtonupload.setAttribute('class', 'btn btn-primary disabled');
        modalButtonupload.setAttribute('id', 'multiuploadSubmit');
        modalButtonupload.textContent = 'Importer';
        modalButtonupload.addEventListener('click',this.submit.bind(this))

    const modalButtonFooter = document.createElement('button');
        modalButtonFooter.setAttribute('type', 'button');
        modalButtonFooter.setAttribute('class', 'btn btn-secondary');
        modalButtonFooter.setAttribute('aria-dismiss', 'modal');
        modalButtonFooter.textContent = 'Fermer';
        modalButtonFooter.addEventListener('click', event => {
          this.removeModal(modaId);
          this.reInit();
        }, true);

    modalFooter.appendChild(nbDoc);    
    modalFooter.appendChild(modalButtonupload);
    modalFooter.appendChild(modalButtonFooter);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    return modal;
  }

  build(modalcenter, files, gedUploadData){
    if(this.isFromHamac) this.uploadBuilder.buildHamac(modalcenter, files, gedUploadData);
    else this.uploadBuilder.build(modalcenter, files, gedUploadData); // construction des Elements
  }

  /**Ajout de la modal au Dom et intitialisation des listeners associés */
  addMultiModal(){
    let modal =this.createMultiFileModal();
    document.body.appendChild(modal);
    this.uploadBuilder.listeners();
    return modal;
  }

  /**Retrait de la modal */
  removeModal(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }

  /**Affichage de la modal */
  showModal() {
    let modal = this.addMultiModal();
      modal.setAttribute('style',
        'width: 100%; padding-right: 17px; display: block; transition: opacity .15s linear !important;');
      modal.classList.add('show');
  }

  /**
   * reinitialise le builder et l'input file
   * @param {Boolean} withRefresh true rafraichis les données
   */
  reInit(withRefresh = false){}

  /** true si l'explorer est hors context marco */
  _isHorsContext(){
    return this.gedUploadData === 'ALLOW_UPLOAD_HORS_CONTEXT';
  }

}
