import {Component} from "../Component.js";
import {DataTableCell} from "./DataTableCell.js";

export class DataTableRow extends Component {

    set cells(value) {
        this._cells = value
    }

    initComponents() {
        this._cells
            .map(cell => new DataTableCell({cell}))
            .forEach(dataTableCell => dataTableCell.attach(this.dom))
    }


    toHtml() {
        return `<div class="table-row datatable__row"></div>`;
    }
}

