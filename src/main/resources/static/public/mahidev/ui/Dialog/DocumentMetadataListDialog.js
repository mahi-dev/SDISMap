import {DialogPanel} from "./DialogPanel.js";
import {DataTable} from "../datatable/DataTable.js";
import {DocumentMetadataRow} from "./DocumentMetadataRow.js";

export class DocumentMetadataListDialog extends DialogPanel {

	set tooltips(value){
		this._tooltips = value
	}

	_initWrapId() {
		this._wrapId = 'metadata';
	}

	_initTitle() {
		this._title = 'Métadonnées';
	}

	_initContent(metadataMap) {
		let metadatas = Object.entries(metadataMap);
		let headings = ['Clé', 'Valeur'];
		let rowBuilder = (item) => new DocumentMetadataRow({ value: item, tooltips : this._tooltips });
		this.content = { dataTable: new DataTable({ headings: headings, items: metadatas, rowBuilder: rowBuilder }) };
	}
}