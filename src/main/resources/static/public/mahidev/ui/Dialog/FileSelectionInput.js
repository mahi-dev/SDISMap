import {Component} from "../Component.js";

export class FileSelectionInput extends Component {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('fileSelectionInput');
	}

	set placeholder(value) {
		this._placeholder = value;
	}

	toHtml() {
		return `
			<div class="form-group">
			    <div class="custom-file">
			        <input id="${this.wrapId}" class="custom-file-input" type="file" name="file">
			        <label for="${this.wrapId}" class="custom-file-label">${this._placeholder}</label>
			    </div>
			</div>
		`;
	}
}