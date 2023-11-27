import {CloseButton} from "../Button/CloseButton.js";
import {Component} from "../Component.js";
import ContextualSearch from "../SearchFilter/ContextualSearch.js";
import {CustomFilterPanel} from "./CustomFilterPanel.js";
import {FilterPanel} from "./FilterPanel.js";

export class SidePanel extends Component {

    static NONE = '0';

    static DISPLAY_WIDTH = '25%';

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('sidePanel');
    }

    set display(value) {
        this._displayed = value;
        this.dom.style.width = value ? SidePanel.DISPLAY_WIDTH : SidePanel.NONE;
    }

    set hover(value) {
        this[value ? 'addClass' : 'removeClass']('hover');
    }

    set searchInputValue(value) {
        this._contextualSearch.inputValue = value;
    }

    set closeButtonVisible(value) {
        this._closeButton.visible = value;
    }

    set customFilters(value) {
        this._customFilters = value;
    }

    set addFilterButton(value) {
        this._customFilterPanel.addFilter(value);
    }

    set removeFilter(id) {
        this._customFilterPanel.removeFilter(id);
    }


    bindEvents() {
        this._closeButton.addEventListener('click', () => this.fireEvent(new CustomEvent('displaySidePanel', {
            detail: {
                display: false
            }
        })));

        this._contextualSearch.addEventListener('searchClick', e => this.fireEvent(new CustomEvent('searchClick', {
            detail: {
                search: {value: e.detail.search, inFile: e.detail.toggleState}
            }
        })));

        this._filterPanel.addEventListener('filter', e => this.fireEvent(new CustomEvent('filter', {
            detail: {
                filter: e.detail.filter,
                add: e.detail.add
            }
        })));
        this._filterPanel.addEventListener('remove', e => this.fireEvent(new CustomEvent('remove', {
            detail: {
                filter: e.detail.filter,
                target: e.detail.target
            }
        })));
    }

    toHtml() {
        return `<div id="${this.wrapId}" class="sidepanel col-4"></div>`;
    }

    toggle() {
        this.display = this.dom.style.width !== SidePanel.DISPLAY_WIDTH;
        return this._displayed;
    }

    initComponents() {
        this._closeButton = new CloseButton({
            id: 'closeSidePanel'
        });
        this._closeButton.attach(this.dom);

        this._contextualSearch = new ContextualSearch();
        this._contextualSearch.attach(this.dom);

        this._filterPanel = new FilterPanel({
            title: "Filtres"
         
        });
        this._filterPanel.attach(this.dom);


        this._customFilterPanel = new CustomFilterPanel({
            customFilters: this._customFilters
        });
        this._customFilterPanel.attach(this.dom);
    }

}
