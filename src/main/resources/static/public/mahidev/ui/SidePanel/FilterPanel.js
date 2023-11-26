import { Component } from "../Component.js";
import { MultiSelectionFilterGroup } from "./MultiSelectionFilterGroup.js";
import { SingleSelectionFilterGroup } from "./SingleSelectionFilterGroup.js";

export class FilterPanel extends Component {

    set title(value){
        this._title = value;
    }
    /****************************/    
    /** Prestation type Filters */
    set prestationFilters(value){
        this._prestationFilters = value;
    }

    get prestationFilterButtons(){
        return this._prestationFiltersGroup.checkableFilters;
    }

    get _prestationTypeElement(){
        return this.dom.querySelector("div.contentfilter__filters__prestation_Type");
    }
    /****************************/
    /********  date Filters *****/
    set dateFilters(value){
        this._dateFilters = value;
    }

    get dateFilterButtons(){
        return this._dateFiltersGroup.hyperlinkFilters;
    }

    get _datesElement(){
        return this.dom.querySelector("div.contentfilter__filters__dates");
    }
    /****************************/
    /****************************/
    /******  format Filters *****/
    set formatFilters(value){
        this._formatFilters = value;
    }

    get formatFilterButtons(){
        return this._formatFiltersGroup.hyperlinkFilters;
    }

    get _formatsElement(){
        return this.dom.querySelector("div.contentfilter__filters__formats");
    }
    /****************************/

	constructor(options) {
		super(options);
		this.wrapId = this._generateId('filter_content');
	}

	initComponents() {
        this.initFilters();
	}

	bindEvents() {
        if(!!this._prestationFiltersGroup){
            this._prestationFiltersGroup.addEventListener('filter', this._filter.bind(this));
        }
        if(!!this._dateFiltersGroup){
            this._dateFiltersGroup.addEventListener('filter', this._filter.bind(this));
            this._dateFiltersGroup.addEventListener('remove', e => this.fireEvent(new CustomEvent('remove', {
                detail: {
                    filter: e.detail.data,
                    target: e.detail.target
                }
            })));
        }
        if(!!this._formatFiltersGroup){
            this._formatFiltersGroup.addEventListener('filter', this._filter.bind(this));
        }
	}

	toHtml() {
		return `<div id="${this.wrapId}_filters" class="contentfilter__filters">
                <h3  id="${this.wrapId}_${this._title}" class="contentfilter__filters__title">${this._title}</h3>
                <div id="${this.wrapId}_${this._title}_prestation_Type" class="contentfilter__filters__prestation_Type"></div>
                <div id="${this.wrapId}_${this._title}_dates" class="contentfilter__filters__dates"></div>
                <div id="${this.wrapId}_${this._title}_formats" class="contentfilter__filters__formats"></div>
            </div>`;
	}

    initFilters() {
        if(Array.isArray(this._prestationFilters)){
            this._prestationFiltersGroup = new MultiSelectionFilterGroup({filters: this._prestationFilters, title: "Nature des prestations"});
            this._prestationFiltersGroup.attach(this._prestationTypeElement)
        }
        if(Array.isArray(this._dateFilters)){
            this._dateFiltersGroup = new SingleSelectionFilterGroup({filters: this._dateFilters, title: "Dates"});
            this._dateFiltersGroup.attach(this._datesElement)
        }
        if(Array.isArray(this._formatFilters)){
            this._formatFiltersGroup = new MultiSelectionFilterGroup({filters: this._formatFilters, title: "Formats"});
            this._formatFiltersGroup.attach(this._formatsElement)
        }
    }

    _filter(event) {
        const current = event.detail.target;
        const filter = event.detail.data;
        current.blur()
        let classList = current.classList;
        let add = !classList.contains('active');
        classList[ add ? 'add' : 'remove']('active');
        this.fireEvent(new CustomEvent('filter', {
            detail: { filter : filter.metadataFilter, add }
        }));
    }
 }
