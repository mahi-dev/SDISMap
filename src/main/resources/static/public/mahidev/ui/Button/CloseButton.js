import {Button} from './Button.js';

export class CloseButton extends Button {

	set visible(value){
		this[!value ? 'addClass':'removeClass']('hidden');
	}

	toHtml() {
		return `<button type="button" id="${this._id}" class="btn-close closebtn" aria-label="Close">&times;</button>`;
	}
}
