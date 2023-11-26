import {Button} from './Button.js';

export class FormButton extends Button {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('formButton');
	}

	set type(value) {
		this._type = value;
	}

	set value(value) {
		this._value = value;
	}

	set form(value) {
		this._form = value;
	}

	toHtml() {
		return `<input id="${this.wrapId}" type="${this._type}" class="btn btn-secondary" aria-dismiss="modal" form="${this._form}" value ="${this._value}"></input>`;
	}
}
