import {DialogPanel} from "./DialogPanel.js";
import {DataTable} from "../datatable/DataTable.js";
import {DocumentRow} from "../datatable/DocumentRow.js";
import {MessageContent} from "./MessageContent.js";

export class ConfirmationDialog extends DialogPanel {

	_initWrapId() {
		this._wrapId = 'confirmationDialog';
	}

	_initTitle(value) {
		this._title = value;
	}

	_initContent(value) {
		let content = {};

		let messageContent = new MessageContent({ value: value.message });
		let headings = [];
		let rowBuilder = item => new DocumentRow({ value: item.fileName });

		content.message = messageContent;
		content.dataTable = new DataTable({ headings: headings, items: value.selectedDocuments, rowBuilder: rowBuilder });

		this.content = content;
	}
}