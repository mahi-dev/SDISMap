import {FilterButton} from './FilterButton.js';
import {Component} from '../Component.js';

export class RemovableFilterButton extends Component {

	set id(value){
		this._id = value;
	}

	set name(value){
		this._name = value;
	}

	// set data(value){
	// 	this._filterButton.data = value;
	// }

	// get data(){
	// 	return this._filterButton.data;
	// }

	set data(value){
		this._data = value;
	}

	get data() {
		return this._data;
	}

	set borderColor(value){
		this._filterButton.borderColor = value;
		this._removeButton.borderColor = value;
	}

	initComponents(){
		this._filterButton = new FilterButton({id : this._generateId('filterbutton')});
		this._filterButton.addEventListener('click', (e) => {
			this.fireEvent(new CustomEvent('filter', { detail: { target : e.target, data: this._data }}));
		});
		this._filterButton.attach(this.dom);
		this._filterButton.name = this._name;

		this._removeButton = new FilterButton({id : this._generateId('removebutton')});
		this._removeButton.addEventListener('click', (e) => 
			this.fireEvent(new CustomEvent('remove', { detail: { target : e.target, data: this._data  }}))
		);
		this._removeButton.attach(this.dom);
		this._removeButton.name = 'x';
	}

	toHtml() {
		return `<div class="btn-group removablefilterbutton" id="${this._id}"></div>`;
	}

	detach() {
		this.dom.remove();
	}

}
