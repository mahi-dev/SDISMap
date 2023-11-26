import {Component} from '../Component.js';

export class SelectionBox extends Component {

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('SelectionBox');
	}

	get selectBox(){
		return this.dom.querySelector('select');
	}

	get value(){
		return this.selectBox.value;
	}

	set options(values){
		this._clear();
		this._options = values;
		this._options.forEach( value => {
			this._add(value.value, value.label);
		})
	}

	set label(value) {
		this._label = value;
	}
	
	toHtml() {
		return `
	        <div class="form-group">
	            <label for="${this.wrapId}_select">${this._label}</label>
	            <select id="${this.wrapId}_select" class="form-control"></select>
	        </div>
		`;
	}

	_add(value, label){
		let option = document.createElement('option');
			option.value = value;
			option.innerHTML = label;
		this.selectBox.appendChild(option); 
	}

	_getSelectedValue(value){
		return this._options.filter( option => option.value === value)[0];
	}

	_clear(){
		this.selectBox.options.length = 0;
	}

	bindEvents(){
		this._changeEvent = this._onChange.bind(this);
        this.selectBox.addEventListener('change', this._changeEvent);
	}

    unbindEvents() {
        this.selectBox.removeEventListener('change', this._changeEvent);
	}

    _onChange(e) {
         this.fireEvent(new CustomEvent('changeValue', {
			detail: {
				option : this._getSelectedValue(e.target.value)
			}
		}));
    }
}
