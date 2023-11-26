import {Component} from "../Component.js";
import {FileSelectionInput} from "./FileSelectionInput.js";
import {TextAreaInput} from "../form/TextAreaInput.js";

export class CheckinForm extends Component {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('checkinForm');
	}

	initComponents() {
		this.fileSelectionInput = new FileSelectionInput({ placeholder: 'Choisir un fichier' });
		this.fileSelectionInput.attach(this.dom);

		this.commentInput = new TextAreaInput({ label: 'Commentaire' });
		this.commentInput.attach(this.dom);
	}

	bindEvents() {
		this.dom.querySelector('.custom-file-input').addEventListener('change', event => {
				this.dom.querySelector('.custom-file-label').textContent = event.target.files[0].name;
			}
		);
	}

	toHtml() {
		return `
            <form id="${this.wrapId}" enctype="multipart/form-data">
            </form>
		`;
	}
}