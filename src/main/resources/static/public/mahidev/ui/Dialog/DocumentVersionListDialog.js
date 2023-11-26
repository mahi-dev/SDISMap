import {DialogPanel} from "./DialogPanel.js";
import {DataTable} from "./DataTable.js";
import {DocumentVersionRow} from "./DocumentVersionRow.js";

export class DocumentVersionListDialog extends DialogPanel {

	_initWrapId() {
		this._wrapId = 'version';
	}

	_initTitle() {
		this._title = 'Versions';
	}

	_initContent(value) {
		let headings = ['Nom du fichier', 'Code de la version', 'Commentaire'];
		let documentVersions = value.documentInfos.versions.map(version => new DocumentVersion(value.documentInfos, version))
		let rowBuilder = item => new DocumentVersionRow({ value: item });
		let dataTable = new DataTable({ headings: headings, items: documentVersions, rowBuilder: rowBuilder }) 
		dataTable.addEventListener('downloadVersion', e => this.fireEvent(new CustomEvent('downloadVersion', {
			detail: {
				documentId:  e.detail.documentId,
				version : e.detail.version,
				fileName : e.detail.fileName
			}
		})));

		dataTable.addEventListener('restoreVersion', e => this.fireEvent(new CustomEvent('restoreVersion', {
			detail: {
				documentId: e.detail.documentId,
				version : e.detail.version
			}
		})));
		this.content = { dataTable };
	}
}

export class DocumentVersion {

	constructor(documentInfos, version) {
		this._documentInfos = documentInfos;
		this._version = version;
	}
}