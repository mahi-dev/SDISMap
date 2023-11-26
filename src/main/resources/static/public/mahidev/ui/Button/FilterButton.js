import {Button} from './Button.js';

export class FilterButton extends Button {

	/**
	 * @public
	 * Setter du nom du bouton
	 * @param {String} value le nom à afficher
	 */
	set name(value) {
		this.dom.innerText = value;
	}

	toHtml() {
		return `<button type="button" id="${this._id}" class="btn btn-light filterButton"></button>`;
	}
}
