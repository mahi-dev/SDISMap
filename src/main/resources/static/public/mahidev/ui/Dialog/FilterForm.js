import {Component} from "../Component.js";
import {Input} from "../form/Input.js";
import {SelectionBox} from "../form/SelectionBox.js";
import {FilterOperator} from "../../../resources/data/filters.js";

export class FilterForm extends Component {

	set items(value) {
		this._items = value;
	}

	get isValid() {
		return this.dom.checkValidity();
	}

	get items() {
		return this._items;
	}

	get filter() {
		let name = this._nameInput.value;
		let filter = {};
		filter.id = "Filter-".concat(name.replace(/\s+/g, "_"));
		filter.name = name;
		filter.metadataFilter = {
			metadata: this._metadata.value,
			operator: this._comparisonOperator.value,
			value: [this._filterValue],
			type: 'custom'
		};
		return filter;
	}

	set filterValue(value) {
		this._filterValue = value;
		this.fireEvent(new CustomEvent('metadataFilterEvent', {
			detail: {
				input: this._metadataValue.input
			}
		}));
	}

	set metadataValueInput(type) {
		this._metadataValue.detach()
		this._metadataValue = new Input({
			label: 'Valeur',
			inputType: this._toInputType(type),
			inputPlaceholder: this._toPlaceholder(type)
		});
		this._metadataValue.attach(this.dom);
		this._metadataValue.required = true;
		this._metadataValue.border = 'red';
		this._metadataValue.addEventListener('inputEvent', e => this.filterValue = e.detail.value);
	}

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('filterForm');
	}

	initComponents() {
		this._nameInput = new Input({
			label: 'Nom',
			inputType: 'text',
			inputPlaceholder: 'Nom du filtre'
		});
		this._nameInput.attach(this.dom);
		this._nameInput.required = true;
		this._nameInput.border = 'red';
		this._nameInput.maxlength = '30';

		this._metadata = new SelectionBox({
			label: 'Metadonnée'
		});
		this._metadata.attach(this.dom);
		this._metadata.options = this.items;

		this._comparisonOperator = new SelectionBox({
			label: 'Opérateur'
		});
		this._comparisonOperator.attach(this.dom);
		this._comparisonOperator.options = FilterOperator.filter(operator => operator.type.includes(this.items[0]?.type));

		this._metadataValue = new Input({
			label: 'Valeur',
			inputType: this._toInputType(this.items[0]?.type),
			inputPlaceholder: this._toPlaceholder(this.items[0]?.type)
		});
		this._metadataValue.attach(this.dom);
		this._metadataValue.required = true;
		this._metadataValue.border = 'red';
	}

	bindEvents() {
		this._filterCreation = this._onFilterCreation.bind(this);
		this._valueChange = e => this.filterValue = e.detail.value;
		this._changeEvent = this._reloadItems.bind(this);

		this._nameInput.addEventListener('inputEvent', this._filterCreation);
		this._metadataValue.addEventListener('inputEvent', this._valueChange);
		this._metadata.addEventListener('changeValue', this._changeEvent);
	}

	unbindEvents() {
		this._nameInput.removeEventListener('inputEvent', this._filterCreation);
		this._metadataValue.removeEventListener('inputEvent', this._valueChange);
		this._metadata.removeEventListener('changeValue', this._changeEvent);
	}

	toHtml() {
		return `<form id="${this.wrapId}" enctype="multipart/form-data"></form>`;
	}

	_toInputType(value) {
		return (value === 'd:text') ? "text" : (value === 'd:datetime') ? "date" : (value === 'd:long' || value === 'd:double' || value === 'd:int') ? "number" : "text";
	}

	_toPlaceholder(value) {
		return [{
				type: "text",
				placeholder: "valeur"
			}, {
				type: "number",
				placeholder: "valeur (nombre)"
			}, {
				type: "date",
				placeholder: "jj/mm/aaaa"
			}]
			.filter(obj => obj.type == this._toInputType(value)).map(obj => obj.placeholder)[0];
	}

	_reloadItems(value) {
		const type = value?.detail?.option?.type;
		const options = FilterOperator.filter(operator => operator.type.includes(type));
		this._comparisonOperator.options = options;
		this.metadataValueInput = type;
	}

	_onFilterCreation() {
		this.fireEvent(new CustomEvent('filterCreation', {
			detail: {
				input: this._nameInput.input
			}
		}));
	}
}
