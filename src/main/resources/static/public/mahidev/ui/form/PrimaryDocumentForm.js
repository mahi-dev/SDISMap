import { Component } from "../Component.js";
import { SelectionBox } from "./SelectionBox.js";

export class PrimaryDocumentForm extends Component {
	
	/**
	 *
	 */
	set items(value){
		this._items = value;
	}

	get items(){
		return this._items;
	}

	get primaryDocumentId() {
		return this._primaryDocumentSelectBox.value;
	}

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('primaryDocumentForm');
	}

	/**
	 * @public
	 * @returns {void}
	 */
	initComponents() {
		this._primaryDocumentSelectBox = new SelectionBox({ label: 'Sélectionnez le document principal' });
		this._primaryDocumentSelectBox.attach(this.dom);
		this._primaryDocumentSelectBox.options = this._items;
	}
	
	bindEvents() {
		let selector = '#' + this.wrapId + " select";
		this.dom.querySelector(selector).addEventListener('change', () => {
			this.fireEvent(new CustomEvent('primaryDocumentChange', {detail: {primaryDocumentId: this.primaryDocumentId}}));
		})
	}

	/**
	 * @public
     * @returns {string}
	 */
	toHtml() {
		return `
			<form id="${this.wrapId}" enctype="multipart/form-data">
			</form>`

	}
}