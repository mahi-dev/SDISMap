import {Component} from "../Component.js";

export class DataTable extends Component {

    /**
     * @param {Object} value
     */
    set headings(value) {
        this._headings = value;
    }

    get items() {
        return this._items;
    }

    /**
     * @param {Object[]} value
     */
    set items(value) {
        this._items = value;
        if (this.dom) {
            this._clearRows();
            this._setRows();
        }

    }

    get rowBuilder() {
        return this._rowBuilder;
    }

    /**
     * @param {Function} value
     */
    set rowBuilder(value) {
        this._rowBuilder = value || (item => new DataTableRow({value: item}));
    }

    initComponents() {
        this._setHeadings();
        this._setRows();
    }

    _setHeadings() {
        for (let heading of this._headings) {
            let cell = new HeadingCell({value: heading});
            cell.attach(this.dom.firstElementChild);
        }
    }

    _setRows() {
        for (const item of this._items) {
            let row = this._rowBuilder(item);
            row.attach(this.dom);
        }
    }

    _clearRows() {
        if (!this.dom)
            return;
        this.dom.querySelectorAll('div.datatable__row').forEach(row => this.dom.removeChild(row));
    }

    toHtml() {
        return `
			<div class="table" style="display: table;">
				<div class="datatable__header" style="display: table-row;"></div>
			</div>`;
    }
}

class HeadingCell extends Component {

    set value(value) {
        this._value = value;
    }

    toHtml() {
        return `<div style="display: table-cell;">${this._value}</div>`;
    }
}

class DataTableRow extends Component {

    /**
     * @param {Object} value
     */
    set value(value) {
        this._value = value;
    }

    toHtml() {
        return `
			<div style="display: table-row;">
				<div class="datatable__row" style="display: table-cell;">${this._value}</div>
			</div>`;
    }
}
