import {Component} from '../Component.js';
import {Hyperlink} from '../Button/link/Hyperlink.js';

export class SortBar extends Component {

	set id(value) {
        this._id = value;
	}

	set sortController(value) {
        this._sortController = value;
    }

    /**
     * @public
     * getter du bouton de critère de tri
     * @return {Hyperlink} le bouton de critere
     */
    get sortTypeButton(){
        return this._sortTypeButton;
    }

    /**
     * @public
     * getter du bouton d'ordre de tri
     * @return {Hyperlink} le bouton d'ordre
     */
    get sortOrderButton(){
        return this._sortOrderButton;
    }

    initComponents() {
        /*sortType */
        this._sortTypeButton = this._createSortButton('sortType');

        /*sortOrder */
        this._sortOrderButton = this._createSortButton('sortOrder');

        this._sortController.init(this._sortTypeButton, this._sortOrderButton);
    }

    toHtml() {
        return `
			<div id=${this._id} class="row sortBar">
				<input type="checkbox" class="selectAllCheckbox" id="allSelector">
        	</div>
		`;
    }

    bindEvents() {
        this.dom.querySelector('input').addEventListener('click', e => this.fireEvent(new CustomEvent('selectAll', {
            detail: {
                checked: e.target.checked
            }
        })));
        this._sortTypeButton.addEventListener('click', e => this.fireEvent(new CustomEvent('sortType')));
        this._sortOrderButton.addEventListener('click', e => this.fireEvent(new CustomEvent('sortOrder')));
    }

    /**
     * @private
     * Création d'un bouton de tri
     * @param {String} id l'id du bouton
     */
    _createSortButton(id) {
        const button = new Hyperlink({ id: id });
        button.attach(this.dom);
        return button;
    }
}