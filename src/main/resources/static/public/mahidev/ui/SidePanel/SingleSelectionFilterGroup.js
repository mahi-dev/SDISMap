import { Hyperlink } from "../Button/link/Hyperlink.js";
import {Component} from "../Component.js";

export class SingleSelectionFilterGroup extends Component {

    set title (value) {
        this._title = value;
    }

    set filters(value) {
        this._filters = value;
    }

    get hyperlinkFilters() {
        return this._hyperlinkFilters;
    }

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('hyperlink_filters');
        this._hyperlinkFilters = [];
	}

	initComponents() {
        if(Array.isArray(this._filters))
            this._filters.forEach(this.addFilter.bind(this));
	}

    bindEvents() {
        if(Array.isArray(this.hyperlinkFilters))
            this.hyperlinkFilters.forEach(this._addEventsListener.bind(this));
	}

	toHtml() {
		return `<div id="${this.wrapId}" class="hyperlinkFilters">
                    <h6  id="${this.wrapId}_${this._title}" class="hyperlinkFilters__title">${this._title}</h6>
                </div>`;
	}

    addFilter(filter) {
        let hyperlinkFilterButton = new Hyperlink({ id: filter.id });
            hyperlinkFilterButton.attach(this.dom);
            hyperlinkFilterButton.name = filter.name;
            hyperlinkFilterButton.data = filter;
            hyperlinkFilterButton.tooltip = filter.name;
            hyperlinkFilterButton.active = false;
        this._hyperlinkFilters.push(hyperlinkFilterButton);
    }

    _addEventsListener(filter) {
        filter.addEventListener('click',  (e) => {
            this._removeActiveFilters(filter)
            .then((clickedFilter)=>{
                clickedFilter.active = true;
                this.fireEvent(new CustomEvent('filter', { detail: { target : clickedFilter.hyperlink , data: clickedFilter.data }}));
            })
        });
    }

    _removeActiveFilters(clickedFilter) {
            return new Promise(resolve => {
                this.hyperlinkFilters
                    .filter(filterButton => filterButton.isActive && filterButton.data.id !== clickedFilter.data.id)
                    .forEach(filterButton => { 
                        this.fireEvent(new CustomEvent('remove', 
                            { detail: { target : filterButton.hyperlink, data: filterButton.data }}));
                        filterButton.active = false;
                    });
                resolve(clickedFilter);
            });
    }
}
