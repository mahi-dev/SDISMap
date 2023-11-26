/**
 * @abstract
 */
export class Dialog {

    /**
     * @protected
     *
     * {HTMLElement}
     */
    elementDialog;

    /**
     *
     * @param {string} title
     * @param {string} modalId
     */
    constructor(title, modalId) {
        this.title = title;
        this.modalId = modalId;

    }

    /**
     * @public
     */
    attach() {
        document.body.prepend(this.elementDialog);
    }

    /**
     * @public
     */
    detach() {
        this.elementDialog.remove();
    }

    /**
     * @protected
     *
     * @param {HTMLElement} modalElement
     */
    bindEvent(modalElement) {
        modalElement.querySelector('.close')
            .addEventListener('click', (event) => {
            modalElement.remove();
        });
    }

    /**
     * @protected
     *
     * @returns {HTMLElement}
     */
    create() {
        const container = document.createElement('div');
        container.setAttribute('id', `${this.modalId}`);
        container.classList.add('modal', 'd-block');
        container.setAttribute('tabindex', '-1');
        container.setAttribute('role', 'dialog');
        container.innerHTML +=  `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fermer">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>               
        `;

        return container;
    }
}