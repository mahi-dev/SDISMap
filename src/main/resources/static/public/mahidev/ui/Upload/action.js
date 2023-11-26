'use strict';

/** class de Gestion des actions */
export class Action{

    constructor(input, fileUpload, label, action, currentEntity){
        this.input = input;
        this.fileUpload = fileUpload;
        this.label = label;
        this.event = action.event;
        this.eventType = action.eventType;
        this.currentEntity = currentEntity;
        this.addActionListener();
    }

    /**
     * Crée l'event avec l'action associé
     */
    addActionListener(){

        const event = (e) =>{
            if(_isNotEmpty(this.event)) this[this.event]();
        }

        this.input.addEventListener(this.eventType, event.bind(this));
       
    }

    /*********************** Methodes correspondant aux Enum com.agysoft.marco.commun.controler.ged.explorer.GedExplorerUpload.Action *******************************/

    getMetadata(){
        let categorie = document.getElementById('Categorie');
        let value = ( _isNotEmpty(categorie) && categorie.value === 'PIECE_CONTRAT') ? 'PIECES_CONTRAT' : this.input.value;
        let selectedLabel = this.input.options[this.input.selectedIndex].innerHTML;
        if(value !== this.label){
            this.fileUpload().addActionRaised({metadata : {docType:value, docTypeLabel:selectedLabel} });
            sendToMarco({metadata : {docType:value, docTypeLabel:selectedLabel} });
        }else{
            this.fileUpload().clearMetadata();
        }
        
    }

    getDocType(){
        const value = this.input.value;
        if(value !== this.label){
            this.fileUpload().addActionRaised({"docType":value});
            sendToMarco({"docType":value})
        }
    }

}
