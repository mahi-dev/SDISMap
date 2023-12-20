import {Component} from "../Component.js";
import {DataTableCell} from "./DataTableCell.js";

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

    initComponents() {
        this._dataTableRows = this._cells
            .map(cell => new DataTableCell({cell, addOrder: this._isHeader}));

        this._dataTableRows.forEach(dataTableCell => dataTableCell.attach(this.dom));
        this._dataTableRows.forEach(this._bindEvents.bind(this));

        if (this._isDuplicate)
            this.addClass('duplicate');
        if (this._color)
            this.dom.style.color = `${this._color}`;
    }

    toHtml() {
        return `<div class="table-row datatable__row"></div>`;
    }

    _bindEvents(row) {
        row.addEventListener('sort', console.log);
    }
}

