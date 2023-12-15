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

    seColorStyle() {
        if (this._color)
            this.dom.style.color = `${this._color}`;
    }

    initComponents() {
        this._cells
            .map(cell => new DataTableCell({cell}))
            .forEach(dataTableCell => dataTableCell.attach(this.dom));
        if (this._isDuplicate)
            this.addClass('duplicate');
        if (this._color)
            this.dom.style.color = `${this._color}`;
    }


    toHtml() {
        return `<div class="table-row datatable__row"></div>`;
    }
}

