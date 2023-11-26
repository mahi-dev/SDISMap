import {Component} from "../Component.js";

export class PrimaryDocumentRow extends Component {
	
	/**
	 * @param {Object} value
	 */
	set value(value) {
		this._documentInfo = value.document;
		this._documentType = this._getDocumentType(value.primaryDocumentId);
	}
	
	/**
	 * @param {string} value
	 */
	set documentType(value) {
		this._documentType = this._getDocumentType(value);
	}
	
	
	_getDocumentType(primaryDocumentId) {
		return this._documentInfo.metadataMap.documentId === primaryDocumentId ? 'Principal' : 'Annexe';
	}

	toHtml() {
		return `
			<div class="datatable__row" style="display: table-row;">
				<div style="display: table-cell;">${this._documentInfo.fileName}</div>
				<div style="display: table-cell;">${this._documentType}</div>
			</div>`;
	}
}