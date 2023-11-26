'use strict';
import {FileUpload, FileUploadCollection} from '../../model/FileUploadCollection.js';
import {Action} from './action.js';
import {Visibility} from './Visibility.js';
import pretty from '../../lib/prettysize.js';

class UploadElement{

    constructor(parentElement, title, label, metadata, type, values, required, visibility, actions, currentEntity, fileUploadCollection, fileUpload, event){

        this.parentElement = parentElement;
        this.title = title;
        this.label = label;
        this.metadata = metadata;
        this.type = type;
        this.required = required;
        this.visibility = visibility;
        this.values = values;
        this.actions = actions;
        this.currentEntity = currentEntity;
        this.fileUploadCollection = fileUploadCollection;
        this.fileUpload = fileUpload;
        this.event = event;
    }

    createElement(){

        if(this.values.length === 0) {
            this.fileUploadCollection().updateRequireMetadata(this.metadata, this.label, false);
        }
        if(this.type.input === 'DROPDOWN') this.createDropdown();
        if(this.type.input === 'CHECKBOX' && this.values.length > 0) this.createCheckbox();
    }


    createDropdown() {

        let div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('data-metadata', this.metadata);
        this.parentElement.appendChild(div);

        let divTitles = document.createElement('div');
        divTitles.setAttribute('class', 'form-group col-xs-5 col-sm-5 col-lg-5');
        divTitles.setAttribute('style', 'text-align: right; padding-left:0px !important');
        div.appendChild(divTitles);

        let divValues = document.createElement('div');
        divValues.setAttribute('class', 'form-group col-xs-7 col-sm-7 col-lg-7');
        divValues.setAttribute('style', 'align-items: center; padding-left:0px !important');
        div.appendChild(divValues);

        let dropValues = {};
        for(let i = 0; i < this.values.length; i++ ){
            dropValues[this.values[i].value] = this.values[i].label;
        }
        const selectValues = {
            id: this.metadata,
            label: this.label,
            values: dropValues
        };

        const select = document.createElement('select');
        select.setAttribute('class', 'form-control col-8 mr-2');
        select.setAttribute('id', this.label);

        const firstOption = document.createElement('option');
        firstOption.setAttribute('selected', '');
        firstOption.textContent = selectValues.label;
        select.appendChild(firstOption);

        for (let [key, value] of Object.entries(selectValues.values)) {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.textContent = value;
            select.appendChild(option);
        }

        divTitles.appendChild(this.addTiTle());
        divValues.appendChild(select);
        select.addEventListener('change',this.event);

        if(_isNotEmpty(this.visibility)) {
            for(let i =0; i< this.visibility.length; i++)
                new Visibility( this.parentElement, this.fileUploadCollection, div, this.visibility[i], select, this.metadata, this.label);
        }

        if(_isNotEmpty(this.actions)) {
            for(let i =0; i< this.actions.length; i++)
                new Action(select, this.fileUpload, this.label , this.actions[i], this.currentEntity);
        }

        if(_isEmpty(this.values)) {
            div.classList.add('hidden');
        }
      }

    createCheckbox(){
        let div = document.createElement('div');
        div.setAttribute('class', 'row');
        div.setAttribute('data-metadata', this.metadata);
        this.parentElement.appendChild(div);

        let divTitles = document.createElement('div');
        divTitles.setAttribute('class', 'form-group col-xs-5 col-sm-5 col-lg-5');
        divTitles.setAttribute('style', 'text-align: right; padding-left:0px !important');
        div.appendChild(divTitles);
        divTitles.appendChild(this.addTiTle());

        let divValues = document.createElement('div');
        divValues.setAttribute('class', 'form-group col-xs-7 col-sm-7 col-lg-7');
        divValues.setAttribute('style', 'align-items: center; padding-left:0px !important');
        div.appendChild(divValues);

        const form = document.createElement("form");
            form.setAttribute('class','checkbox')

        divValues.appendChild(form)

        const firstcheckbox = document.createElement("INPUT");
            firstcheckbox.setAttribute('id','Tous')
            firstcheckbox.setAttribute('type', 'checkbox');

        const label = document.createElement("label");
            label.textContent =  'Tous';
            label.setAttribute('for','Tous')
            label.setAttribute('style','padding-left:10px;')

        let p1 = document.createElement('p');
            p1.setAttribute('style', 'align-items: center; margin-bottom: 0;')
            p1.appendChild(firstcheckbox);
            p1.appendChild(label);
        form.appendChild(p1);

        for(let i = 0; i < this.values.length; i++ ){
            const checkbox = document.createElement("INPUT");
                checkbox.setAttribute('id',this.values[i].id)
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('data-id', this.values[i].id);
                checkbox.setAttribute('data-code', this.values[i].value);
                checkbox.setAttribute('data-libelle', this.values[i].label);
                checkbox.name = this.values[i].value +' - '+this.values[i].label;

                checkbox.addEventListener('change',  (event) => {
                    let collection = this.fileUploadCollection().fileUploadCollection;
                    let metaChbx = {};
                    let id = checkbox.dataset.id;

                    const uncheck = (fileUpload) =>{
                        if(fileUpload.tempMetadata.hasOwnProperty(id)) delete fileUpload.tempMetadata[id];
                    }

                    const check = (fileUpload) =>{
                        metaChbx['ext_lotId'] = checkbox.dataset.id;
                        metaChbx['mw_ext_lotCode'] = checkbox.dataset.code;
                        metaChbx['mw_ext_lotLibelle'] = checkbox.dataset.libelle;
                        fileUpload.tempMetadata[id] = metaChbx;
                    }

                    if(!checkbox.checked) {
                        firstcheckbox.checked = false;
                        collection.forEach(fileUpload => uncheck(fileUpload));
                    }
                    if(checkbox.checked) {
                        collection.forEach(fileUpload => check(fileUpload));
                    }

                    collection.forEach(fileUpload => fileUpload.setLotMetadata());
                })

            let label = document.createElement("label");
                label.setAttribute('style','padding-left:10px;')
                label.textContent =  checkbox.name;
                label.setAttribute('for',this.values[i].id)

            let p = document.createElement('p');
                p.setAttribute('style', 'align-items: center; margin-bottom: 0;')
                p.appendChild(checkbox);
                p.appendChild(label);
                form.appendChild(p);
        }

        firstcheckbox.addEventListener('click',  (event) => {
            for(let i = 1; i < form.children.length; i++ ){
                if(!firstcheckbox.checked && form.children[i].firstChild.checked){
                    form.children[i].firstChild.click();
                }
                if(firstcheckbox.checked && !form.children[i].firstChild.checked) {
                    form.children[i].firstChild.click();
                }
            }
          });

          for(let i =0; i< this.visibility.length; i++){
            new Visibility( this.parentElement, this.fileUploadCollection, div, this.visibility[i], Visibility.IGNORING, this.metadata, this.label);
        }

      }

      addTiTle(){
        const title = document.createElement('h6');
        let titleBuilder = [];
            titleBuilder.push(this.title);
            if(this.required) titleBuilder.push('*');
            titleBuilder.push(' : ');
        title.textContent = titleBuilder.join("");
        title.setAttribute('style','margin: 10px 10px;')
        return title;
      }
}

export default class UploadBuilder{

    constructor(){
        this.currentEntity;
        this.elements;
        this.fileUploadCollection = new FileUploadCollection();
        this.uploadElementCollection = [];
        this.currentFileIndex = 1;
    }

    /** retourne l'index depuis l'ordre */
    static findIndexByOrder(object, ordre){
        return object.findIndex(object => object.ordre === ordre);
    }

    initializeHandler(remove = false){
        this.metadataHandler(remove);
        this.docTypeHandler(remove);
    }

    getFileUploadCollection(){
        return this.fileUploadCollection;
    }

    getFileCollection(){
        return this.getFileUploadCollection().fileUploadCollection;
    }

    buildHamac(parentElement, files , gedUploadData){
        for (var i = 0; i < files.length; i++) {
            const id = createUUID();
            gedUploadData.documentId = id;
            const fileUpload = new FileUpload(id, files[i]);
            fileUpload.setMetadata(gedUploadData);
            this.fileUploadCollection.add(fileUpload);
        }
        this.createBaseGedUpload(parentElement);
    }

	build(parentElement, files , gedUploadData){
        for (var i = 0; i < files.length; i++) {
            const fileUpload = new FileUpload(i, files[i]);
            this.fileUploadCollection.add(fileUpload);
       }

       for(let i = 0; i<gedUploadData.length; i++){
            const idx =  UploadBuilder.findIndexByOrder(gedUploadData, i);
            const title = gedUploadData[idx].title;
            const label = gedUploadData[idx].label;
            const metadata = gedUploadData[idx].metadata;
            const type = gedUploadData[idx].type;
            const required = gedUploadData[idx].required;
            const visibility = gedUploadData[idx].visibility;
            const values = gedUploadData[idx].values;
            const actions = gedUploadData[idx].actions;
            const linked = gedUploadData[idx].linked;

            const getFileUpload = () =>{
                const collection = this.getFileCollection();
                return collection[this.currentFileIndex-1];
            }

            const event = (e) =>{
                let value = e.currentTarget.options[e.currentTarget.selectedIndex].value;
                this.getFileUploadCollection().addMetadata(metadata, value, this.currentFileIndex);
                if(linked.length) {
                    linked.forEach((link, idx)=>{
                        let linkedMetadata = link.metadata;
                        let linkedValue = link.values[e.currentTarget.selectedIndex-1].value;
                        this.getFileUploadCollection().addMetadata(linkedMetadata, linkedValue, this.currentFileIndex);
                    })
                }
            }

            const uploadElement = new UploadElement(parentElement, title, label, metadata, type, values, required, visibility, actions
                                                        ,this.currentEntity, this.getFileUploadCollection.bind(this), getFileUpload.bind(this), event.bind(this));
            this.addUploadElement(uploadElement);
        }

        this.createGedUpload();
        this.createBaseGedUpload(parentElement);
        this.elements = Array.from(parentElement.children)
                            .slice(0, this.uploadElementCollection.length)
                            .map(el => Array.from(el.children)[1])
                            .filter(el =>  el );

    }

    addUploadElement(uploadElement){
        if(_isNotNullOrUndefined(uploadElement)){
            this.uploadElementCollection.push(uploadElement);
            const fileUploadCollection = this.getFileCollection();
            for(let i = 0; i < fileUploadCollection.length; i++ ){
                fileUploadCollection[i].uploadAuthorization.addRequireMetadata(uploadElement.metadata, uploadElement.label, uploadElement.required);
            }
        }

    }

    createGedUpload() {
        this.uploadElementCollection.forEach(uploadElement=>{
            const fileUploadCollection = this.getFileUploadCollection();
            let nameSansExt = get_name_sans_extension(this.getFileCollection()[this.currentFileIndex-1].file.name);
            fileUploadCollection.updateLibelle(nameSansExt, this.currentFileIndex)

            uploadElement.createElement();
        })
    }

    listeners(){
        this.initializeHandler();
        const collection = this.getFileCollection();
        const applyAll = document.getElementById('applyAll');
        const size = collection.length;
        const previous = document.getElementById('previousDoc');
        const next = document.getElementById('nextDoc');
        const docname = document.getElementById('multidocname');
        const sizeDoc = document.getElementById('sizeDoc');
        const nbDoc = document.getElementById('nbDoc');
        const libelle = document.getElementById('typeLibelle');

        if(this.currentFileIndex === 1) previous.classList.add('disabled-link');
        if(this.currentFileIndex === size) next.classList.add('disabled-link');
        docname.textContent = collection[this.currentFileIndex-1].file.name;
        sizeDoc.textContent = this.getFileSize(collection[this.currentFileIndex-1].file.size);
        nbDoc.textContent = this.currentFileIndex + '/' + size;
        libelle.value = collection[this.currentFileIndex-1].metadataMap['typeLibelle'];


        const previousNexthandler = (e) => {
            docname.textContent = collection[this.currentFileIndex-1].file.name;
            sizeDoc.textContent = this.getFileSize(collection[this.currentFileIndex-1].file.size);
            nbDoc.textContent = this.currentFileIndex + '/' + size;

            if(this.currentFileIndex === 1) previous.classList.add('disabled-link');
            else previous.classList.remove('disabled-link');

            if(this.currentFileIndex === size) next.classList.add('disabled-link');
            else next.classList.remove('disabled-link');

            this.elements.forEach((el, idx) =>{
                const metadata = this.uploadElementCollection[idx].metadata;
                const value = collection[this.currentFileIndex-1].metadataMap[metadata];
                el.value = value;
            })

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

        const clearValue = () => {
            collection[this.currentFileIndex-1].clearAll();
            document.getElementById('typeLibelle').value = '';
            this.elements.forEach((el, idx) =>{
                const label = el.id//this.uploadElementCollection[idx].label;
                el.value = label;
            })
        }

        const applyAllEvent = (event) => {
            if(applyAll.checked) {
                clearValue();
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

        const divider = document.createElement('div');
            divider.setAttribute('class', 'dropdown-divider');
        parentElement.appendChild(divider);

        let divLabel = document.createElement('div');
            divLabel.setAttribute('class', 'form-group row');
        parentElement.appendChild(divLabel);

        let divCommentaire = document.createElement('div');
            divCommentaire.setAttribute('class', 'form-group row');
        parentElement.appendChild(divCommentaire);

        let divTitlesLabel = document.createElement('div');
        divTitlesLabel.setAttribute('class', 'col-xs-5 col-sm-5 col-lg-5');
        divTitlesLabel.setAttribute('style', 'text-align: right;');
        divLabel.appendChild(divTitlesLabel);

        let divValuesLabel = document.createElement('div');
        divValuesLabel.setAttribute('class', 'col-xs-7 col-sm-7 col-lg-7');
        divValuesLabel.setAttribute('style', 'align-items: center; padding-left:0px !important');
        divLabel.appendChild(divValuesLabel);

        let divTitlesCommentaire = document.createElement('div');
        divTitlesCommentaire.setAttribute('class', 'col-xs-5 col-sm-5 col-lg-5');
        divTitlesCommentaire.setAttribute('style', 'text-align: right;');
        divCommentaire.appendChild(divTitlesCommentaire);

        let divValuesCommentaire = document.createElement('div');
        divValuesCommentaire.setAttribute('class', 'col-xs-7 col-sm-7 col-lg-7');
        divValuesCommentaire.setAttribute('style', 'align-items: center;; padding-left:0px !important');
        divCommentaire.appendChild(divValuesCommentaire);

        const libelleTitle = document.createElement('h6');
            libelleTitle.textContent =  'Libellé du document* : ';
            libelleTitle.setAttribute('style','margin: 10px 10px;')

        const eventLibelle = (e) =>{
            const value = e.currentTarget.value;
            const fileUploadCollection = this.getFileUploadCollection();
            fileUploadCollection.updateLibelle(value, this.currentFileIndex)
        }

        const libelle = document.createElement('input');
            libelle.setAttribute('class', 'uploadInputText');
            libelle.setAttribute('id', 'typeLibelle');
            libelle.setAttribute('type', 'text');
            libelle.setAttribute('size', 45);
            libelle.addEventListener('input', eventLibelle.bind(this));

        divTitlesLabel.appendChild(libelleTitle);
        divValuesLabel.appendChild(libelle);

        const comTitle = document.createElement('h6');
            comTitle.textContent =  'Commentaire : ';
            comTitle.setAttribute('style','margin: 10px 10px;')
            libelle.setAttribute('rows', 4);
            libelle.setAttribute('cols', 45);

        const eventCommentaire = (e) =>{
            let collection = this.getFileCollection();
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

        divTitlesCommentaire.appendChild(comTitle);
        divValuesCommentaire.appendChild(commentaire);
    }

    clear(){
        this.fileUploadCollection.clear();
    }

    setCurrentEntity(currentEntity){
        this.currentEntity = currentEntity;
    }

    metadataHandler(remove = false){
        let options = {useCapture:false, passive:false, once:false};
        if(remove) {
            window.removeEventListener('message', this.metadataEvent, options)
            return;
        }
        const updateCategorie = () => {
            let categorie = document.getElementById('Categorie');
            if (categorie) {
                let categorieCode = categorie.value;
                let categorieLibelle = categorie.options[categorie.selectedIndex].innerHTML;
                this.fileUploadCollection.addMetadata('categorieCode', categorieCode, this.currentFileIndex);
                this.fileUploadCollection.addMetadata('categorieLibelle', categorieLibelle, this.currentFileIndex);
            }
        }

        this.metadataEvent = event => {
            if (isJsonString(event.data)) {
                const data = JSON.parse(event.data);
                if(data.hasOwnProperty('metadata')){
                    let fileUploadCollection = this.getFileCollection();
                    if(this.fileUploadCollection.isApplyAllSelected()){
                        fileUploadCollection.forEach(fileupload => {
                            const id = createUUID();
                            fileupload.setMetadata(data.metadata);
                            fileupload.addMetadata('documentId',id);
                        });
                    } else {
                        fileUploadCollection[this.currentFileIndex-1].setMetadata(data.metadata);
                    }
                    updateCategorie()
                    fileUploadCollection[this.currentFileIndex-1].checkMetadata();
                }
            }
        }

        window.addEventListener('message', this.metadataEvent, options);
    }

    docTypeHandler(remove = false){
        let options = {useCapture:false, passive:false, once:false};
        if(remove) {
            window.removeEventListener('message', this.docTypeEvent, options)
            return;
        }
        this.docTypeEvent = event => {
            if (isJsonString(event.data)) {
                const data = JSON.parse(event.data);
                if(data.hasOwnProperty('docType')){
                    let select = document.getElementById("Type");
                    while (select.options.length > 0) {
                        select.remove(0);
                    }

                    const firstOption = document.createElement('option');
                    firstOption.setAttribute('selected', '');
                    firstOption.textContent = "Type";
                    select.appendChild(firstOption);

                    for (let i =0; i < data.docType.typeCode.length ; i++) {
                        const option = document.createElement('option');
                        option.setAttribute('value', data.docType.typeCode[i]);
                        option.textContent = data.docType.typeLibelle[i];
                        select.appendChild(option);
                    }

                    if(data.docType.typeCode.length === 1) {
                        select.selectedIndex = 1;
                        select.disabled = true;
                        sendToMarco({"metadata":select.value});
                        this.getFileUploadCollection().addMetadata('typeCode', select.value, this.currentFileIndex);
                        this.getFileUploadCollection().addMetadata('typeLibelle', select.options[select.selectedIndex].innerHTML, this.currentFileIndex);

                    } else select.disabled = false;
                }
            }
        }
        window.addEventListener('message', this.docTypeEvent, options);
    }

    /** formater la taille d'un fichier
        @param  {String} size   taille en octet
        @return {String} taille en kB, MB, GB ....
    */
   getFileSize(size) {
    return pretty(parseInt(size,10));
}
}