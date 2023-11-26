import {Component} from "../Component.js";
import { UserFilters } from "./UserFilters.js";

export class CustomFilterPanel extends Component {

    set customFilters(value){
        this._customFilters = value;
    }
    
	constructor(options) {
		super(options);
		this.wrapId = this._generateId('filter_content');
	}

	initComponents() {
        this.initFilters();
	}

	bindEvents() {
        if(!!this._userFilters){
            this._userFilters.addEventListener('filter', this._filter.bind(this));
            this._userFilters.addEventListener('remove', this._remove.bind(this));
        }
	}

	toHtml() {
		return `<div id="${this.wrapId}" class="contentfilter"></div>`;
	}

    initFilters(){
        if(Array.isArray(this._customFilters)){
            this._userFilters = new UserFilters({filters: this._customFilters });
            this._userFilters.attach(this.dom, {option :{replace : true}});
        }
    }

    addFilter(filter) {
        const removableFilter = this._userFilters.addFilter(filter);
        this._userFilters.addEventsListener(removableFilter);
    }

    removeFilter(id) {
        this._userFilters.removeEventsListener(id);
        this._userFilters.removeFilter(id);
    }

    _filter(event) {
        const current = event.detail.target;
        const filter = event.detail.data;
        current.blur()
        let classList = current.classList;
        let add = !classList.contains('active');
        classList[ add ? 'add' : 'remove']('active');
        this.fireEvent(new CustomEvent('filter', {
            detail: { filter, add }
        }));
    }
    
    _remove(e) {
        this.fireEvent(new CustomEvent('remove', { detail: { event: e.detail.event, filter: e.detail.data }}));
    }
}
