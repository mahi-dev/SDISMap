'use strict';
import {FileUpload, FileUploadCollection} from '../../model/FileUploadCollection.js';
import pretty from '../../lib/prettysize.js';

/**
 *
 * @type {MetadataKeyDefinitionModel[]}
 */
let properties = [];

export default class UploadBuilderHc{

    constructor(gedProperties){
        this._gedProperties = gedProperties;
        this.fileUploadCollection = new FileUploadCollection();
        this.currentFileIndex = 1;
    }

    /** retourne l'index depuis l'ordre */
    static findIndexByOrder(object, ordre){
        return object.findIndex(object => object.ordre === ordre);
    }

	build(parentElement, files){ 

        for (var i = 0; i < files.length; i++) {
            const docId = createUUID();
            const fileUpload = new FileUpload(docId, files[i]);
            fileUpload.addMetadata('documentId', docId)
            fileUpload.addMetadata('typeLibelle', get_name_sans_extension(files[i].name))
            this.fileUploadCollection.add(fileUpload);
       }
       
        this.createBaseGedUpload(parentElement);
    }

    reset(){
        this.fileUploadCollection.reset()
    }

    searchFilterUploadListener(){

        const addMetadata = (store) => {
            for (const [key, value] of Object.entries(store)) {
                if(this.fileUploadCollection.isApplyAllSelected()){
                    this.fileUploadCollection.fileUploadCollection.forEach(fileUpload => {
                        fileUpload.addMetadata(key, value);
                    });
                }else{
                    this.fileUploadCollection.fileUploadCollection[this.currentFileIndex-1].addMetadata(key, value);
                }
            }
        }

        this.search = new SearchFilterUpload(this._gedProperties, addMetadata.bind(this));
        
    }
    
    listeners(){
        this.searchFilterUploadListener();
        const collection = this.fileUploadCollection.fileUploadCollection;
        const applyAll = document.getElementById('applyAll');
        const size = collection.length;
        const previous = document.getElementById('previousDoc');
        const next = document.getElementById('nextDoc');
        const docname = document.getElementById('multidocname');
        const sizeDoc = document.getElementById('sizeDoc');
        const nbDoc = document.getElementById('nbDoc');
        
        if(this.currentFileIndex === 1) previous.classList.add('disabled-link');
        if(this.currentFileIndex === size) next.classList.add('disabled-link');
        docname.textContent = collection[this.currentFileIndex-1].file.name;
        sizeDoc.textContent = this.getFileSize(collection[this.currentFileIndex-1].file.size);
        nbDoc.textContent = this.currentFileIndex + '/' + size;

        const previousNexthandler = (e) => {

            docname.textContent = collection[this.currentFileIndex-1].file.name;
            sizeDoc.textContent = this.getFileSize(collection[this.currentFileIndex-1].file.size);
            nbDoc.textContent = this.currentFileIndex + '/' + size;

            if(this.currentFileIndex === 1) previous.classList.add('disabled-link');
            else previous.classList.remove('disabled-link');

            if(this.currentFileIndex === size) next.classList.add('disabled-link');
            else next.classList.remove('disabled-link');


            const libelle = document.getElementById('typeLibelle');
                libelle.value = collection[this.currentFileIndex-1].metadataMap['typeLibelle'];

            const commentaire = document.getElementById('commentaire');
                commentaire.value = collection[this.currentFileIndex-1].commentaire;
                        
        }

        const nextEvent = (e) => {
            this.currentFileIndex++;
            previousNexthandler();
        }

        const previousEvent = (e) => {
            this.currentFileIndex--;
            previousNexthandler();
        }

        const getTotalSize = () => {
            let size = collection.map(x=> x.file.size)
                                 .reduce((acc, cur) => acc + cur);
            return this.getFileSize(size);
        }

        const applyAllEvent = (event) => {
            if(applyAll.checked) {
                previous.classList.add('disabled-link');
                next.classList.add('disabled-link');
                nbDoc.style.visibility ='hidden';
                docname.textContent = size +' fichiers';
                sizeDoc.textContent = getTotalSize();
                this.fileUploadCollection.applyAllSelected = this.currentFileIndex-1;
            } else{
                nbDoc.style.visibility ='visible';
                if(this.currentFileIndex !== 1) previous.classList.remove('disabled-link');
                if(this.currentFileIndex !== size) next.classList.remove('disabled-link');
                docname.textContent = collection[this.currentFileIndex-1].file.name;
                sizeDoc.textContent = this.getFileSize(collection[this.currentFileIndex-1].file.size);
                this.fileUploadCollection.applyAllSelected = -1;
            }
            this.authorizeUpload();
          }
          
        applyAll.addEventListener('click',  applyAllEvent.bind(this));

        if(size === 1) {
            applyAll.parentElement.classList.add('hidden');
        }else if(size > 1){
            applyAll.parentElement.classList.remove('hidden');
            applyAll.click();
            applyAll.disabled = true;
        }

        previous.addEventListener('click', previousEvent.bind(this) );
        next.addEventListener('click', nextEvent.bind(this) );
  }

    /** Elements presents dans tout les cas */
    createBaseGedUpload(parentElement){
  
        const pLibelle = document.createElement('p');
            pLibelle.setAttribute('class', 'row');
            pLibelle.setAttribute('style', 'align-items: center;');

        const libelleTitle = document.createElement('h6');
            libelleTitle.textContent =  'Libellé du document* : ';
            libelleTitle.setAttribute('style','padding-right:10px;');

        const eventLibelle = (e) =>{
            const value = e.currentTarget.value;
            const metadata = 'typeLibelle';

            if(this.fileUploadCollection.isApplyAllSelected()){
                length = this.fileUploadCollection.fileUploadCollection.length;
                this.fileUploadCollection.fileUploadCollection.forEach((fileUpload, index) => {
                    let newValue = (index === 0)? value : value +"#"+index;
                    fileUpload.addMetadata(metadata, newValue);
                });
            }else{
                this.fileUploadCollection.fileUploadCollection[this.currentFileIndex-1].addMetadata(metadata, value);
            }

            this.authorizeUpload();
        }

        const libelle = document.createElement('input');
            libelle.setAttribute('class', 'uploadInputText');
            libelle.setAttribute('id', 'typeLibelle');
            libelle.setAttribute('type', 'text');
            libelle.addEventListener('input', eventLibelle.bind(this));

        pLibelle.appendChild(libelleTitle);
        pLibelle.appendChild(libelle);

        const pCommentaire = document.createElement('p');
            pCommentaire.setAttribute('class', 'row');
            pCommentaire.setAttribute('style', 'align-items: center;');

        const comTitle = document.createElement('h6');
            comTitle.textContent =  'Commentaire : ';
            comTitle.setAttribute('style','padding-right:10px;');

        const eventCommentaire = (e) =>{
            let collection = this.fileUploadCollection.fileUploadCollection;
            const value = e.currentTarget.value;
            if(this.fileUploadCollection.isApplyAllSelected()){
                for(let i =0 ; i < collection.length ; i++)
                    collection[i].commentaire = value;
                
            }
            else collection[i][this.currentFileIndex-1].commentaire = value;
        }

        const commentaire = document.createElement('TEXTAREA');
            commentaire.setAttribute('id', 'commentaire');
            commentaire.addEventListener('input', eventCommentaire.bind(this));

        pCommentaire.appendChild(comTitle);
        pCommentaire.appendChild(commentaire);
        
        const divider = document.createElement('div');
            divider.setAttribute('class', 'dropdown-divider');
    
        parentElement.appendChild(divider);
        parentElement.appendChild(pLibelle);
        parentElement.appendChild(pCommentaire);
        
    }
    
    clear(){
        this.fileUploadCollection.clear();
    }

    authorizeUpload(){
        let ready = false;

        if(this.fileUploadCollection.isApplyAllSelected()){
            let metadata = this.fileUploadCollection.fileUploadCollection[this.fileUploadCollection.applyAllSelected].metadataMap;
            let isTypeLibelle = metadata['typeLibelle'].length > 0;
            let isMetadataSet =  metadata['documentId'].length > 0;
            ready =  isTypeLibelle && isMetadataSet
        } else {
            ready = this.fileUploadCollection.fileUploadCollection
            .every(fileUpload => {
                let metadata = fileUpload.metadataMap;
                let isTypeLibelle = metadata['typeLibelle'].length > 0;
                let isMetadataSet =  metadata['documentId'].length > 0;
                return isTypeLibelle && isMetadataSet;
            });
        }
        
        if(ready){
          document.querySelector('button#multiuploadSubmit').classList.remove('disabled');
        } else {
          document.querySelector('button#multiuploadSubmit').classList.add('disabled');
        } 
    }

    /** formater la taille d'un fichier
        @param  {String} size   taille en octet
        @return {String} taille en kB, MB, GB ....
    */
   getFileSize(size) {
    return pretty(parseInt(size,10));
}

}


class SearchFilterUpload {
    
    constructor(gedProperties, addMetadata) {
        this.addMetadata = addMetadata;
        this.searchValue = '';
        this.foundProperties = [];
        this.storage = [];
        gedProperties.getPropertiesAsync().then(json => {
            properties = json;
            this.initAutocompletion();
        }).catch(err => {
            console.error(err)
        });

    }

    /**
     * ajout d'un listener sur le champ de recherche
     */
    initAutocompletion() {
        this.bindEvent({
            element: document.querySelector('#modalBody #metadataInput'),
            callback: this.autocomplete.bind(this),
            eventType: 'input'
        });
    }

    /**
     *
     * @param {object} param
     * Champs de l'objet param
     * <ul>
     *     <li>element {HTMLElement}  : element du DOM sur lequel attribuer le listener</li>
     *     <li>callback {Function} : fonction de callback de addEventListener</li>
     *     <li>eventType {string} : type d'événement</li>
     *     <li>data {object} : Objet à passer dans event si nécessaire</li>
     * </ul>
     */
    bindEvent(param) {
        param.element.addEventListener(param.eventType, param.callback);
    }

    removeListener() {
        let param = {
            element: document.querySelector('#modalBody #metadataInput'),
            callback: this.autocomplete.bind(this),
            eventType: 'input'
        }
        param.element.removeEventListener(param.eventType, param.callback);
    }    

    /**
     * Fonctionnalité d'autocomplétion sur un événement de recherche
     * @param {Event} event
     */
    autocomplete(event) {
        this.foundProperties = [];
        this.resetDropdownResult();
        this.searchValue = document.getElementById('metadataInput').value

        if (this.searchValue.length) {
            properties = isJsonString(properties) ? JSON.parse(properties) : properties;

            for (let i = 0; i< properties.length; i++) {
                let value = properties[i].label;
                let key  = properties[i].value;
                let type = properties[i].type;
                if (value.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    this.foundProperties.push({key: key, value: value, type:type});
                }
            }

            this.createDropdownResult();
        }
    }

    /**
     * Sélection d'un item dans la dropdown
     */
    selectProperty() {
        const suggestList = document.querySelectorAll('#modalBody .suggest-search ul li');
        for (const elementProperty of suggestList) {
            this.bindEvent({
                element: elementProperty,
                callback: this.onSelectProperty.bind(this),
                eventType: 'click'
            });
        }
    }

    /**
     *
     * @param {Event} event
     */
    onSelectProperty(event) {
        this.editingProperty(event.target.dataset.property, event.target.innerText, event.target.dataset.type);
        this.resetDropdownResult();
        document.querySelector('#metadataInput').value = '';
        this.searchValue = '';
    }

    /**
     * Création de la dropdown et de son contenu
     */
    createDropdownResult() {
        if (this.foundProperties.length > 0) {
            const ul = document.createElement('ul');
            this.foundProperties.forEach(object => {
                const li = document.createElement('li');
                li.setAttribute('data-property', object.key);
                li.setAttribute('data-type', object.type);
                li.textContent = object.value;
                ul.appendChild(li);
            });
            if (ul.hasChildNodes()) {
                const suggestList = document.querySelector('#modalBody .suggest-search');
                const searchInput = document.querySelector('#metadataInput');
                suggestList.setAttribute('style', 'width:'+ searchInput.offsetWidth + 'px');
                suggestList.appendChild(ul);
                suggestList.classList.remove('invisible');
                this.selectProperty();
            }
        }
    }

    /**
     * Suppression du contenu de la dropdown et passe en invisible
     */
    resetDropdownResult() {
        const suggestList = document.querySelector('#modalBody .suggest-search');
        suggestList.innerHTML = '';
        suggestList.classList.add('invisible');
    }

    /**
     *
     * @param {string} property
     * @param {string} label
     */
    editingProperty(property, label, type) {
        const filtersList = document.querySelector('#filtersListUpload > ul');
        const li = document.createElement('li');
        let input = this.getInput(type);
        li.innerHTML = `<div class="filter-item">
                        <div>
                            <label data-property="${property}">${label} ` + input + ` </label>
                        </div>
                        <div class="fa fa-plus-circle plus-icon">
                        </div>
                    </div>`;
        filtersList.appendChild(li);
        this.bindEvent({
            element: li.querySelector('.plus-icon'),
            callback: this.onSelectedPropertyValue.bind(this),
            eventType: 'click'
        });

        this.bindEvent({
            element: li.querySelector('input'),
            callback: this.onSelectedPropertyValueByKeyboard.bind(this),
            eventType: 'keydown'
        })
    }

    /** creer l'input selon le type de la Metadata */
    getInput(type){

        let textInput = '<input type="text" placeholder="valeur" />';
        let numberInput = '<input type="number" placeholder="valeur (nombre)" />';
        let dateInput = '<input type="date" placeholder="valeur" />';
   
        switch (type) {
            case 'd:text':
                return textInput;
                break;
            case 'd:datetime':
                 return dateInput;
                break;
            case 'd:long':
            case 'd:double':
            case 'd:int':
                return numberInput;
                break;
            default:
                return textInput;
        }
    }

    /**
     *
     * @param {Event} event
     */
    onSelectedPropertyValue(event) {
        const filterItem = event.target.closest('.filter-item');
        const li = filterItem.parentElement;
        const property = filterItem.querySelector('label').dataset.property;
        const label = filterItem.querySelector('label').innerText;
        const inputValue = filterItem.querySelector('input').value;
        const type = filterItem.querySelector('input').type;

        this.addFilter(property, label, inputValue, type);
        li.innerHTML = `<div class="filter-item">
                            <div data-property="${property}" data-value="${inputValue}">${label} = ${inputValue}</div>
                            <div class="fa fa-trash trash-icon"></div>
                        </div>`;
        this.bindEvent({
            element: li.querySelector('.trash-icon'),
            callback: this.deleteFilterCallback.bind(this),
            eventType: 'click'
        });
    }

     /**
     *
     * @param event
     */
    onSelectedPropertyValueByKeyboard(event) {
        if (event.key === 'Enter') {
            this.onSelectedPropertyValue(event);
        }
    }

    /**
     *
     * @param property nom de la métadonnée
     * @param label libellé de la métadonnée
     * @param val valeur de la métadonnée
     */
    addFilter(property, label, val, type) {
        this.storage.push({key: property, label: label, value: val, type: type});
        let store = {};
            store[property] = type === 'date' ? new Date(val).toISOString() : val;
        this.addMetadata(store)
    }

    /**
     *
     * @param {Event} event
     */
    deleteFilterCallback(event) {
        const property = event.target.parentElement.querySelector('div').dataset.property;
        const li = event.target.closest('li');
        li.parentElement.removeChild(li);
        this.deleteFilter(property);
    }

    /**
     *
     * @param {string} property
     */
    deleteFilter(property) {
        const index = this.storage.findIndex(o => o.value === property);
        this.storage.splice(index, 1);
        let store = {};
            store[property] = null;
        this.addMetadata(store)
    }
}
