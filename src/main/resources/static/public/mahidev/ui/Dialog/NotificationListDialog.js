import {DialogPanel} from "./DialogPanel.js";
import {NotificationClient} from "../../service/NotificationClient.js";
import {DataTable} from "../datatable/DataTable.js";
import {NotificationRow} from "./NotificationRow.js";

export class NotificationListDialog extends DialogPanel {

	_initRequiredClasses() {
		this._notificationClient = new NotificationClient();
	}

	_initWrapId() {
		this._wrapId = 'notificationListDialog';
	}

	_init() {
		this._initTitle();
		this._initContent();
		this._initButtons();
	}

	_initTitle() {
		this._title = 'Notifications';
	}

	_initContent() {
		let headings = ['Nom du document', 'Interface', 'Consultation', 'Utilisateur',  'Statut'];

		let rowBuilder = item => new NotificationRow({ value: item });

		this._notificationClient.getNotificationsAsync()
			.then(response => response.json())
			.then(notifications => {
				this.content = { dataTable: new DataTable({ headings: headings, items: notifications, rowBuilder: rowBuilder }) };
			});
	}

	_initButtons() {
		const  submitListener = (event) => {
			this._notificationClient.deleteNotificationsAsync()
			.then(() => {
				this.detach();
				this._init();
			});
		};
		const button = [{ text: 'Supprimer mes notifications', buttonType: 'button', eventType: 'click',  listener: submitListener }];
		super._initButtons(button);
	}
	
	toHtml() {
		return `
			<div id="${this.wrapId}" class="modal notification-dialog" tabindex="-1" role="dialog">
				<div class="notification-dialog__wrapper modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">${this.name}</h5>
						</div>
						<div class="notification-dialog__wrapper__body modal-body">
						</div>
						<div class="modal-footer">
						</div>
					</div>
				</div>
			</div>`;
	}
}