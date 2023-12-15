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

    initComponents() {
        this.createDataTable();
    }

    createDataTable() {
        this._clearDataTable();
        const header = new DataTableRow({cells: this._headers});
        header.attach(this.dom);

        const duplicateMap = (this._distinctDuplicate) ? createDuplicateMap(this._rows) : {};
        const values = (this._distinctDuplicate) ? Object.values(duplicateMap) : [];
        const duplicateColors = (this._distinctDuplicate) ? generateUniqueColors(values.length) : [];
        const duplicateIndex = new Set();
        values.filter(value => value.length > 1).map(idxArray => idxArray.map(value => duplicateIndex.add(value)))

        this._rows.map((cells, idx) => {
            const hasDuplicate = duplicateIndex.has(idx) && this._distinctDuplicate;
            let options = {cells};
            if (hasDuplicate) {
                options.duplicate = hasDuplicate;
                const matchIdx = findIndexByElement(duplicateMap, idx);
                options.color = this._distinctColor ? duplicateColors[matchIdx] : 'red';
            }
            return new DataTableRow(options);
        }).forEach(dataTableRow => dataTableRow.attach(this.dom))
    }

    toHtml() {
        return `<div class="table" style="display: table;"></div>`;
    }

    _clearDataTable() {
        this.dom.innerHTML = '';
    }
}
