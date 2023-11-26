import {Button} from '../Button.js';

export class Hyperlink extends Button {

	/**
	 * @public
	 * sStter du tooltip
	 * @param {String} value le tooltip à afficher
	 */
	set tooltip(value) {
		this.dom.title = value;
	}

	set data(value){
		this._data = value;
	}

	get data() {
		return this._data;
	}

	set active(value){
		this._active = value;
	}

	get isActive() {
		return this._active;
	}
	
	get hyperlink() {
		return this.dom.querySelector('p');
	}

	/**
	 * @public
	 * Setter de l'icône du bouton
	 * @param {String} value la classe FontAwsome à afficher
	 * Devra être remplacé par une source svg
	 */
	set icon(value) {
		this.dom.querySelector('i').setAttribute('class', value);
	}

	/**
	 * @public
	 * Setter du nom du bouton
	 * @param {String} value le nom à afficher
	 */
	set name(value) {
		this.hyperlink.innerText = value;
	}

	toHtml() {
		return `
			<a id="${this._id}" href="#" class="hyperlinkButton" >
				<i aria-hidden="true"></i>
				<p class="hyperlinkText"></p>
			</a>`;
	}
}
