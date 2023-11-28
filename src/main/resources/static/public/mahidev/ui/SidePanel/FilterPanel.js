import {Component} from "../Component.js";
import {SelectionBox} from "../form/SelectionBox.js";

export class FilterPanel extends Component {

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('filter_content');
    }

    set title(value) {
        this._title = value;
    }

    /****************************/
    /** sdis type Filters */
    set sdisFilters(value) {
        this._sdisFilters = value;
    }

    get filterSelectionList() {
        return this._filterSelectionList;
    }

    get _sdisTypeElement() {
        return this.dom.querySelector("div.contentfilter__filters__sdis_Type");
    }

    initComponents() {
        this.initFilters();
    }

    bindEvents() {
        this.filterSelectionList.map(f => f.addEventListener('changeValue', this._filter.bind(this)));
    }

    toHtml() {
        return `<div id="${this.wrapId}_filters" class="contentfilter__filters">
                <h3  id="${this.wrapId}_${this._title}" class="contentfilter__filters__title">${this._title}</h3>
                <div id="${this.wrapId}_${this._title}_sdis_Type" class="contentfilter__filters__sdis_Type"></div>
            </div>`;
    }

    initFilters() {
        this._createSelectionBoxFilter(this._sdisFilters)
    }

    _createSelectionBoxFilter(filters) {
        this._filterSelectionList = Object.entries(filters).map(([key, value]) => {
            const box = new SelectionBox({label: key});
            box.attach(this._sdisTypeElement);
            box.options = value.map(f => ({value: f, label: f}));
            return box;
        });
    }

    _filter(event) {
        const filter = event.detail.filter;
        const option = event.detail.option;

        this.fireEvent(new CustomEvent('filter', {
            detail: {filter, option}
        }));
    }
}
