import {Component} from '../Component.js';

export class Button extends Component {

	set id(value) {
		this._id = value;
	}

	/**
	 * Attribue une donnée au bouton
	 * @param {any} value la donnée a lier
	 */
	set data(value) {
		this.dom.setAttribute('data',JSON.stringify(value));
	}

	/**
	 * Renvoie la donnée liée au bouton
	 * @return {any} la donnée liée
	 */
	get data() {
		return this.dom.getAttribute('data');
	}

	/**
	 * ajout d'un tooltip au boutton
	 */
	set tooltip(value) {
		this.dom.setAttribute('title', value);
	}

	/**
	 * change la couleur des bordures
	 */
	set borderColor(value){
		this.dom.style.borderColor = value;
	}

	/**
	 * @public
	 * Active/désactive le bouton
	 * Verrouille le bouton
	 * @param {Boolean} value true rend le bouton inactif
	 */
	set disable(value){
		this.dom.classList[value ? 'add' : 'remove']('disabled');
	}

    set visible(value){
		this.setVisible(this.dom, value);
    }

	/**
	 * Ajoute un écouteur d'évènement au bouton
	 * @param {String} eventType le type de l'évènenement
	 * @param {Function} listener la fonction à exécuter
	 */
	addDomEventListener(eventType, listener) {
		this.dom.addEventListener(eventType, listener);
	}

	bindEvents() {
		this.addDomEventListener('click', this.fireEvent.bind(this));
	}

	detach() {
		this.unbindEvents();
		this.dom.remove();
	}
}
