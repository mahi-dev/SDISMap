import {Component} from "../Component.js";

export class NotificationRow extends Component {
	
	/**
	 * @param {string} value
	 */
	set value(value) {
		this._value = value;
	}

	toHtml() {
		let fileName = this._value.fileName;
		let parts = this._value.senderId.split('/');
		let moduleName = parts[1];
		let entityCode = parts[4];
		let userEmail = parts[3];
		let status = this._value.status;
		return `
			<div style="display: table-row;" class="notification-table-row">
				<div style="display: table-cell;" class="notification-table-row__cell--filename" alt="${fileName}">${fileName}</div>
				<div style="display: table-cell;" class="notification-table-row__cell" alt="${moduleName}">${moduleName}</div>
				<div style="display: table-cell;" class="notification-table-row__cell" alt="${entityCode}">${entityCode}</div>
				<div style="display: table-cell;" class="notification-table-row__cell" alt="${userEmail}">${userEmail}</div>
				<div style="display: table-cell;" class="notification-table-row__cell">
					<span ${status === 'FAILURE' ? '' : 'hidden'} class="notification-table-row__cell__status badge badge-danger">Erreur</span>
					<span ${status === 'SUCCESS' ? '' : 'hidden'} class="notification-table-row__cell__status badge badge-success">Transfert réussi</span>
				</div>
			</div>`;
	}

}