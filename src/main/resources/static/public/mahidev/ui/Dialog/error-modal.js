export class ErrorModal {

  constructor() {
  }

    /**
     * Creation de la Modal de Error
     * @param {String} modTitle Le titre de la modal à afficher
     * @param {String} message Le message à afficher
     */
    createErrorModal(modTitle, message) {
        /** MODAL */
        const modal = document.createElement('div');
            modal.setAttribute('id', "ErrorModal");
            modal.setAttribute('class', 'modal');
            modal.setAttribute('tabindex', '-2');
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('style',
            'padding-right: 17px; display: block; transition: opacity .15s linear !important;');
            modal.classList.add('show');
    
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
            modalTitle.textContent = modTitle;
    
        modalHeader.appendChild(modalTitle);
        modalContent.appendChild(modalHeader);
    
        /** body*/  
        const modalBody = document.createElement('div');
           modalBody.setAttribute('class', 'modal-body');
           modalBody.setAttribute('id', 'errormsg');

        modalContent.appendChild(modalBody);
    
        /** message */
        if(_isNotNullOrUndefined(message)){
            const msg = document.createElement('h6');
                msg.textContent = message;
            modalBody.appendChild(msg)
        }

       /** footer */ 
        const modalFooter = document.createElement('div');
            modalFooter.setAttribute('class', 'modal-footer');
        
        const modalButtonFooter = document.createElement('button');
            modalButtonFooter.setAttribute('type', 'button');
            modalButtonFooter.setAttribute('class', 'btn btn-secondary');
            modalButtonFooter.setAttribute('aria-dismiss', 'modal');
            modalButtonFooter.textContent = 'Fermer';
        
        modalFooter.appendChild(modalButtonFooter);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
    
        document.body.appendChild(modal);
        
        this.modalListener();
    }

    /**
     * Ajoute un message à la modal d'erreur
     * @param {String} message le texte à ajouté à la modal
     */
    addMessage(message){
        let errormsg = document.getElementById('errormsg');
        if(_isNotNullOrUndefined(errormsg)) {
            const msg = document.createElement('h6');
            msg.textContent = message;
            errormsg.appendChild(msg)
        }
    }

    /**
     * Listener du boutons cancel de la modal de Error
     */
    modalListener(){

        document.querySelector('#ErrorModal button[aria-dismiss="modal"]').
            addEventListener('click', this.removeModal, true);
    }

    /** Retrait de la modal de Error */
    removeModal() {
        let element = document.getElementById('ErrorModal');
        element.parentNode.removeChild(element);
      }

}
