import {Component} from "../Component.js";
import {DataTableRow} from "./DataTableRow.js";

export class DataTable extends Component {

    set headers(value) {
        this._headers = value;
    }

    set rows(value) {
        this._rows = value;
    }

    set distinctDuplicate(value) {
        this._distinctDuplicate = value;
    }

    set distinctColor(value) {
        this._distinctColor = value;
    }

    set dataTableValue(value) {
        if (value?.length > 0) {
            this.rows = value;
        }
        this._clearDataTable();
        this._setDataTableValues();
    }

    initComponents() {
        this.createDataTable();
    }

    bindEvents() {
        this._header.addEventListener('sortColumn', e => this.fireEvent(new CustomEvent('sortColumn', {
            detail: {sortBy: e.detail.sortBy, element: e.detail.element}
        })));
    }

    createDataTable() {
        this._clearDataTable();
        this._setDataTableHeader();
        this._setDataTableValues();
    }

    toHtml() {
        return `<div class="table" style="display: table;"></div>`;
    }

    _setDataTableHeader() {
        this._header = new DataTableRow({cells: this._headers, isHeader: true});
        this._header.attach(this.dom);
    }

    _setDataTableValues() {
        const duplicateMap = (this._distinctDuplicate) ? createDuplicateMap(this._rows) : {};
        const values = (this._distinctDuplicate) ? Object.values(duplicateMap) : [];
        const duplicateColors = (this._distinctDuplicate) ? generateUniqueColors(values.length) : [];
        const duplicateIndex = new Set();
        values.filter(value => value.length > 1).map(idxArray => idxArray.map(value => duplicateIndex.add(value)))

        this._dataTableRows = this._rows.map((cells, idx) => {
            const hasDuplicate = duplicateIndex.has(idx) && this._distinctDuplicate;
            let options = {cells};
            if (hasDuplicate) {
                options.duplicate = hasDuplicate;
                const matchIdx = findIndexByElement(duplicateMap, idx);
                options.color = this._distinctColor ? duplicateColors[matchIdx] : 'red';
            }
            return new DataTableRow(options);
        });
        this._dataTableRows.forEach(dataTableRow => dataTableRow.attach(this.dom));
    }

    _clearDataTable() {
        this._dataTableRows?.map(row => row.clearDataTableRow())
    }
}
