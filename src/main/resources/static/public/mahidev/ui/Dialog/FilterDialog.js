import {
	DialogPanel
} from "./DialogPanel.js";
import {
	FilterForm
} from "./FilterForm.js";

export class FilterDialog extends DialogPanel {

	set customFilters(value){
        this._customFilters = value;
    }

	set disabled(value) {
		let button = this.dom.querySelector('[id^="formButton"]');
		if (value) {
			button.setAttribute("disabled", "");
			return;
		}
		button.removeAttribute("disabled");
	}
	
	get nameExisted() {
		const names = this._customFilters.map(filter => filter.name);
		return names.includes(this._filterForm.filter.name);
	}

	_initRequiredClasses() {}

	_initWrapId() {
		this._wrapId = 'filterDialog';
	}

	_initTitle() {
		this._title = 'Ajouter un filtre';
	}

	_initContent(value) {
		let content = {};
		this._filterForm = new FilterForm({
			items: value
		});
		content.filterForm = this._filterForm;
		this.content = content;

		this._filterForm.addEventListener('filterCreation', (event) => this._setBorderColorIfExist(event.detail.input));
		this._filterForm.addEventListener('metadataFilterEvent', (event) => this._setBorderColor(event.detail.input));
	}

	_initButtons() {
		let filterListener = (event) => {
			if (!this._filterForm.isValid) {
				event.stopPropagation();
				return;
			}
			this.fireEvent(new CustomEvent('addFilter', {
				detail: {
					filter: this._filterForm.filter
				}
			}));
		}
		let buttons = [{
			text: 'Ajouter un filtre',
			buttonType: '',
			eventType: 'click',
			buttonForm: this._filterForm.wrapId,
			listener: filterListener
		}];

		this.buttons = buttons;
		this.disabled = true;
	}

	_setBorderColorIfExist(input) {
		let value = input.value;
		this.disabled = !this._filterForm.isValid;
		input.style.border = '2px solid LimeGreen';
		if (this.nameExisted) {
			input.style.border = '2px solid orange';
			this.disabled = true;
		}
		if (value.length == 0) input.style.border = '2px solid red';
	}

	_setBorderColor(input) {
		let value = input.value;
		this.disabled = !this._filterForm.isValid || this.nameExisted;
		input.style.border = '2px solid LimeGreen';
		if (value.length == 0) input.style.border = '2px solid red';
	}

}