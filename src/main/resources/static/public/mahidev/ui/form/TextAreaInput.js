import { Component } from '../Component.js';

export class TextAreaInput extends Component {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('commentInput');
	}

	set label(value) {
		this._label = value;
	}

	get textArea(){
		return this.dom.querySelector('textarea');
	}

	get value(){
		return this.textArea.value;
	}

	set maxlength(value){
		this.textArea.setAttribute("maxlength", value);
	}

	set required(value){
		if(value){
			this.textArea.setAttribute("required", "");
			return;
		}
		this.textArea.removeAttribute("required");
	}

	set border(color){
		this.textArea.style.border = `2px solid ${color}`;
	}

	bindEvents(){
		this.textArea.addEventListener('input', (event) =>  this.fireEvent(new CustomEvent('commentEvent', {
			detail: {
				value : event.target.value
			}
		})));
	}

	toHtml() {
		return `
	        <div class="form-group">
	            <label for="${this.wrapId}_comment">${this._label}</label>
	            <textarea id="${this.wrapId}_comment" class="form-control"></textarea>
	        </div>
		`;
	}
}