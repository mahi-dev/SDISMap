import {Component} from "../Component.js";
import {DataTableCell} from "./DataTableCell.js";
import {FILTER} from "../../config/message.js";

export class DataTableRow extends Component {

    set cells(value) {
        this._cells = value
    }

    set duplicate(value) {
        this._isDuplicate = value;
    }

    set color(value) {
        this._color = value;

    }

    set isHeader(value) {
        this._isHeader = value;
    }

    seColorStyle() {
        if (this._color)
            this.dom.style.color = `${this._color}`;
    }

    clearDataTableRow() {
        this._dataTableCells?.map(dataTableCell => dataTableCell.detach())
    }

    bindEvents() {
        this._dataTableCells.forEach(this._bindEvents.bind(this));
    }

    initComponents() {
        this._dataTableCells = this._cells
            .map(value => new DataTableCell({
                value,
                cell: this._isHeader ? `<div  class="table-header"><p class="cell-value">${FILTER[value]}</p>` : value,
                addOrder: this._isHeader
            }));

        this._dataTableCells.forEach(dataTableCell => dataTableCell.attach(this.dom));
        if (this._isDuplicate)
            this.addClass('duplicate');
        if (this._color)
            this.dom.style.color = `${this._color}`;
    }

    toHtml() {
        return `<div class="table-row datatable__row"></div>`;
    }

    _bindEvents(row) {
        row.addEventListener('sortColumn', e => this.fireEvent(new CustomEvent('sortColumn', {
            detail: {sortBy: e.detail.sortBy, element: e.detail.element}
        })));
    }
}

