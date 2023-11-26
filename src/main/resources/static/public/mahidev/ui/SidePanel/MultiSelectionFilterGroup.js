import { Component } from "../Component.js";
import { CheckBox } from "../Button/CheckBox.js";

export class MultiSelectionFilterGroup extends Component {

    set title (value){
        this._title = value;
    }

    set filters(value){
        this._filters = value;
    }

    get checkableFilters() {
        return this._checkableFilters;
    }

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('checkbox');
        this._checkableFilters = [];
	}

	initComponents() {
        if(Array.isArray(this._filters))
            this._filters.forEach(this.addFilter.bind(this));
	}

	bindEvents() {
        if(Array.isArray(this.checkableFilters))
            this.checkableFilters.forEach(this._addEventsListener.bind(this));
	}

	toHtml() {
		return `<div id="${this.wrapId}" class="checkableFilters">
                    <h6  id="${this.wrapId}_${this._title}" class="checkableFilters__title">${this._title}</h6>
                </div>`;
	}

    addFilter(filter) {
        let checkableFilterButton = new CheckBox({ id: filter.id });
        checkableFilterButton.name = filter.name;
        checkableFilterButton.attach(this.dom);
        checkableFilterButton.data = filter;
        this.checkableFilters.push(checkableFilterButton);
    }

    _addEventsListener(filter) {
        filter.addEventListener('changeValue',  (e) => 
                this.fireEvent(new CustomEvent('filter', { detail: { target : e.detail.target , data: filter.data , checked: e.detail.checked}}))
            );
    }
}
