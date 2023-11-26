import {Button} from './Button.js';

export class DialogButton extends Button {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('dialogButton');
	}

	set type(value) {
		this._type = value;
	}

	set value(value) {
		this._value = value;
	}

	toHtml() {
		return `
			<button id="${this.wrapId}" type="${this._type}" class="btn btn-secondary" aria-dismiss="modal">
				${this._value}
			</button>`;
	}
}
