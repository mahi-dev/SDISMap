import {Button} from './Button.js';

export class AnchorButton extends Button {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('anchorButton');
	}

	set href(value) {
		this._href = value;
	}

	set value(value) {
		this._value = value;
	}

	removeAttribute(value){
		this.dom.removeAttribute(value);
	}

	toHtml() {
		return `
			<a id="${this.wrapId}" class="btn btn-secondary" href="${this._href}" role="button" aria-dismiss="modal">
				${this._value}
			</a>`;
	}
}
