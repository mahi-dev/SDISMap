import { FILTER } from '../../config/message.js';
import {Component} from '../Component.js';

export class SelectionBox extends Component {

	static NO_VALUE = 'NO_VALUE';

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
		this._addTitleOption(this._label);
		this._options.forEach( value => {
			this._addOption(value.value, value.label);
		})
	}

	set label(value) {
		this._filter = value;
		this._label = FILTER[value];
	}
	
	toHtml() {
		return `
	        <div class="form-group">
	            <select id="${this.wrapId}_select" class="form-control"></select>
	        </div>
		`;
	}

	_addTitleOption(label){
		const option = document.createElement('option');
			option.textContent = label;
			option.value = SelectionBox.NO_VALUE;

			option.style.color = 'red'; 
		option.style.fontWeight = 'bold'; 
		this.selectBox.appendChild(option); 
	}

	_addOption(value, label){
		const option = document.createElement('option');
			option.value = value;
			option.textContent = label;
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
				option : e.target.value,
				filter : this._filter
			}
		}));
    }
}
