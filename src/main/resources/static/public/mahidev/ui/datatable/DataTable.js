import {Component} from "../Component.js";
import {DataTableRow} from "./DataTableRow.js";

export class DataTable extends Component {

    set headers(value) {
        this._headers = value;
    }

    set rows(value) {
        this._rows = value;
    }

    initComponents() {
        const header = new DataTableRow({cells: this._headers});
        header.attach(this.dom);
        this._rows.map(cells => new DataTableRow({cells}))
            .forEach(dataTableRow => dataTableRow.attach(this.dom))
    }

    toHtml() {
        return `<div class="table" style="display: table;"></div>`;
    }
}

