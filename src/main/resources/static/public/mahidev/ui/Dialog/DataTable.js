import {Component} from "../Component.js";

export class DataTable extends Component {

	rowBuilder = (item => new DataTableRow({ value: item }));

	set headings(value) {
		this._headings = value;
	}

	set items(value) {
		this._items = value;
	}

	set rowBuilder(value) {
		this._rowBuilder = value || (item => new DataTableRow({ value: item }));
	}

	initComponents() {
		this._initHeadings();
		this._initRows();
    }

	_initHeadings() {
		for (const heading of this._headings) {
			let cell = new HeadingCell({ value: heading });
			cell.attach(this.dom.firstElementChild);
		}
	}

	_initRows() {
        //Creation des lignes et ajout au dom.
		for (const item of this._items) {
			let row = this._rowBuilder(item);
			row.addEventListener('downloadVersion', e => this.fireEvent(new CustomEvent('downloadVersion', {
				detail: {
					documentId:  e.detail.documentId,
                    version : e.detail.version,
                    fileName : e.detail.fileName
				}
			})));

			row.addEventListener('restoreVersion', e => this.fireEvent(new CustomEvent('restoreVersion', {
				detail: {
				    documentId: e.detail.documentId,
                    version : e.detail.version
				}
			})));

			row.attach(this.dom);
		}
	}

	toHtml() {
		return `
			<div class="table" style="display: table;">
				<div style="display: table-row;">
				</div>
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

	set value(value) {
		this._value = value;
	}

	toHtml() {
		return `
			<div style="display: table-row;">
				<div style="display: table-cell;">${this._value}</div>
			</div>`;
	}
}