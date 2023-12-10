import {Component} from "../Component.js";

export class DataTableCell extends Component {

    set cell(value) {
        this._cell = value
    }

    toHtml() {
        return `<div class="table-cell">${this._cell}</div>`;
    }
}
