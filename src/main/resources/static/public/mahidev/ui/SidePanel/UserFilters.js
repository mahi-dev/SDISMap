import { RemovableFilterButton } from "../Button/RemovableFilterButton.js";
import {Component} from "../Component.js";

export class UserFilters extends Component {

    set filters(value) {
        this._filters = value;
    }

    get removableFilters() {
        return this._removableFilters;
    }

    set removableFilters(value) {
        this._removableFilters = value;
    }

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('removable_filters');
        this.removableFilters = [];
	}

	initComponents() {
        if(Array.isArray(this._filters))
            this._filters.forEach(this.addFilter.bind(this));
	}

	bindEvents() {
        if(Array.isArray(this._removableFilters))
            this._removableFilters.forEach(this.addEventsListener.bind(this));
	}

    unbindEvents() {
        if(Array.isArray(this._removableFilters))
            this._removableFilters.forEach(this._removeEventsListener.bind(this));
	}


	toHtml() {
		return `<div id="${this.wrapId}" class="removableFilters"></div>`;
	}

    addFilter(filter) {
        const removableFilterButton = new RemovableFilterButton({ id: filter.id });
            removableFilterButton.name = filter.name;
            removableFilterButton.attach(this.dom);
            removableFilterButton.data = filter.metadataFilter;
        this._removableFilters.push(removableFilterButton);
        return removableFilterButton;
    }

    removeFilter(id) {
        this._removableFilters = this._removableFilters.filter(filter => {
            return filter.id !== id;
        })
    }

    addEventsListener(filter) {
        this._filter = this._filterEvent.bind(this);
        this._remove = this._removeEvent.bind(this);
        filter.addEventListener('filter', this._filter);
        filter.addEventListener('remove', this._remove);
    }

    removeEventsListener(id) {
        const filter = this._removableFilters.filter(filter => filter.id === id)
        if(filter) {
            this._removeEventsListener(filter)
        }
    }
    
    _removeEventsListener(filter) {
        filter.removeEventListener('filter', this._filter);
        filter.removeEventListener('remove', this._remove);
    }

    _filterEvent(e) {
        this.fireEvent(new CustomEvent('filter', { detail: { target : e.detail.target, data: e.detail.data }}));
    }
    
    _removeEvent(e) {
        this.fireEvent(new CustomEvent('remove', { detail: { event: e, data: e.detail.data } }));
    }
}
