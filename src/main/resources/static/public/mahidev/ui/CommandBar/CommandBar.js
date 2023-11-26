import { Component } from '../Component.js';
import { IconAnchorButton } from '../Button/IconAnchorButton.js';
import { ToggleIconButton } from '../Button/ToggleIconButton.js';

export class CommandBar extends Component {

    static NO_SELECTION = 0;
    static ONE_SELECTION = 1;
    static MULTIPLE_SELECTION = 2;
    static GRID = 'Vue en grille';
    static LIST = 'Vue en liste';

	set id(value) {
		this._id = value;
	}

    set defaultView(value){
        if (!((value === CommandBar.GRID) || (value === CommandBar.LIST)))
            throw new Error(`Vue non existante ${value}`);
        this._view = value;
    }

    initComponents() {
        this._addVerticalDivider();
        /*shareButton */
        this._shareButton = this._createCommandButton('shareButton', true, 'Partager', 'fa fa-share-alt');

        /*downloadButton */
        this._downloadButton = this._createCommandButton('downloadButton', true, 'Télécharger', 'fa fa-download');

        /*previewButton */
        this._previewButton = this._createCommandButton('previewButton', true, 'Prévisualiser PDF', 'fa fa-file-pdf', 'fa fa-eye');

        /*deleteButton */
        this._deleteButton = this._createCommandButton('deleteButton', true, 'Supprimer', 'fa fa-trash');

        this._addVerticalDivider();

        /*SignButton */
        this._SignButton = this._createCommandButton('SignButton', true, 'Signer', 'fa fa-pen-nib', 'fa fa-signature');

        /*checkButton */
        this._checkButton = this._createCommandButton('checkButton', true, 'Vérifier la signature', 'fa fa-file', 'fa fa-check');

        this._addVerticalDivider();

        /*extractButton */
        this._extractButton = this._createCommandButton('extractButton', true, 'Extraire', 'fa fa-upload');

        /*checkinButton */
        this._checkinButton = this._createCommandButton('checkinButton', true, 'Archiver', 'fa fa-archive');

        /*showMetadataButton */
        this._showMetadataButton = this._createCommandButton('showMetadataButton', true, 'Afficher les métadonnées', 'fa fa-tags');

        /*showVersionsButton */
        this._showVersionsButton = this._createCommandButton('showVersionsButton', true, 'Afficher les versions', 'fa fa-undo');

        this._addVerticalDivider();

        /*notificationButton */
        this._notificationButton = this._createCommandButton('notificationButton', false, 'Notifications', 'fas fa-history');

        /*listGridButon */
        this._listGridButon = this._createToggleButton('listGridButon', this._primaryButton.title, this._primaryButton.icon, this._secondaryButton.title, this._secondaryButton.icon);
    }

    toHtml() {
        return `<div id=${this._id} class="row commandBar"></div>`
    }

    bindEvents() {
        /*shareClick */
        this._shareButton.addEventListener('click', () => this.fireEvent(new CustomEvent('shareClick')));

        /*downloadClick */
        this._downloadButton.addEventListener('click', () => this.fireEvent(new CustomEvent('downloadClick')));

        /*previewClick */
        this._previewButton.addEventListener('click', () => this.fireEvent(new CustomEvent('previewClick')));

        /*deleteClick */
        this._deleteButton.addEventListener('click', () => this.fireEvent(new CustomEvent('deleteClick')));

        /*SignClick */
        this._SignButton.addEventListener('click', () => this.fireEvent(new CustomEvent('SignClick')));

        /*checkClick */
        this._checkButton.addEventListener('click', () => this.fireEvent(new CustomEvent('checkClick')));

        /*extractClick */
        this._extractButton.addEventListener('click', () => this.fireEvent(new CustomEvent('extractClick')));

        /*checkinClick */
        this._checkinButton.addEventListener('click', () => this.fireEvent(new CustomEvent('checkinClick')));

        /*showMetadataClick */
        this._showMetadataButton.addEventListener('click', () => this.fireEvent(new CustomEvent('showMetadataClick')));

        /*showVersionsClick */
        this._showVersionsButton.addEventListener('click', () => this.fireEvent(new CustomEvent('showVersionsClick')));

        /*notificationClick */
        this._notificationButton.addEventListener('click', () => this.fireEvent(new CustomEvent('notificationClick')));

         /*toogleEvent */
         this._listGridButon.addEventListener('toogleEvent', (e) => this.fireEvent(new CustomEvent('viewToogle', {
			detail: {
				view: e.detail.button == ToggleIconButton.BUTTON_B ? this._primaryButton.title : this._secondaryButton.title
			}
		})));
    }

    /**
     * Mise à jour de l'affichage des bouttons
     * @param {Number} selection Enum representant la selection ou non des documents
     * @param {Boolean} locked true si le document est locké
     */
    updateButtonStatus(selection, locked){
        const singleSelection = selection === CommandBar.ONE_SELECTION;
        const extractEnable = !locked && singleSelection;
        const checkinEnable = locked && singleSelection;

        this._shareButton.disable = selection === CommandBar.NO_SELECTION;
        this._downloadButton.disable = selection === CommandBar.NO_SELECTION;
        this._previewButton.disable = selection === CommandBar.NO_SELECTION;
        this._deleteButton.disable = selection === CommandBar.NO_SELECTION;
        this._SignButton.disable = selection === CommandBar.NO_SELECTION;
        this._checkButton.disable = selection === CommandBar.NO_SELECTION;
        this._extractButton.disable = !extractEnable;
        this._checkinButton.disable = !checkinEnable ;
        this._showMetadataButton.disable = !singleSelection;
        this._showVersionsButton.disable = !singleSelection;
    }
    
    get _primaryButton() {
        return this._view === CommandBar.LIST ? {title : CommandBar.GRID, icon :'fa fa-th'} : {title : CommandBar.LIST, icon: 'fa fa-list'};
    }

    get _secondaryButton() {
        return this._view === CommandBar.LIST ? {title : CommandBar.LIST, icon: 'fa fa-list'} : {title : CommandBar.GRID, icon :'fa fa-th'} ;
    }

    /**
     * @private
     * Création d'un bouton de commande
     * @param {String} id l'id du bouton
     * @param {Boolean} disableByefault true désactive le bouton par default
     * @param {Function} event la methode à declanché
     * @param {String} tooltip la tooltip
     * @param {String} icon l'icon principal - classe fontawsome
     * @param {String} iconOver l'icon secondaire - optionnal
     */
    _createCommandButton(id, disableByDefault, tooltip, icon, iconOver = null) {
        const button = new IconAnchorButton({ isDoubleIcon: !!iconOver, id: id });
        button.attach(this.dom);
        button.icon = icon;
        if (!!iconOver) button.iconOver = 'iconOver ' + iconOver;
        button.tooltip = tooltip;
        button.disable = disableByDefault;
        return button;
    }
    
    _createToggleButton(id, name_a, icon_a, name_b, icon_b) {
        let button = new ToggleIconButton({
            id
        });
        button.attach(this.dom);
        button.noBorder = true;
        button.show(name_a, icon_a, name_b, icon_b);
        return button;
    }

    /**
     * @private
     * crée un separateur Vertical
     */
    _addVerticalDivider() {
        const divider = document.createElement('div');
        divider.setAttribute('class', 'buttonDivider-vertical');
        this.dom.appendChild(divider);
    }
}
