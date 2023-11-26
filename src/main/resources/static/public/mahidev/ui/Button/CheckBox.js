import { Button } from './Button.js';

export class CheckBox extends Button {

	set id(value){
		this._id = value;
	}

	set name(value){
		this._name = value;
	}

	set data(value){
		this._data = value;
	}

	get data() {
		return this._data;
	}

	get isChecked(){
		return this._checkbox.checked;
	}

	get _checkbox(){
		return this.dom.querySelector('input');
	}

	bindEvents(){
		this._checkbox.addEventListener('change',  (e) => {
			this.fireEvent(new CustomEvent('changeValue', { detail: { target : e.target , data: this._data , checked: this.isChecked }}));
		});
	}

	toHtml() {
		return `<div class="btn-group checkablebutton" id="${this._id}_container">
					<input type="checkbox" name="checkbox" id="${this._id}" value="${this._data}">
					<label for="${this._id}">${this._name}</label>
				</div>`;
	}

	detach() {
		this.dom.remove();
	}
}
