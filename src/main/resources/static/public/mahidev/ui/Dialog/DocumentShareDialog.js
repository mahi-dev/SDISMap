'user strict';

import { DialogPanel } from "./DialogPanel.js";
import { MessageContent } from "./MessageContent.js";
import { ModuleButton } from "../Button/ModuleButton.js";
import { PrimaryDocumentForm } from "../form/PrimaryDocumentForm.js";
import { DataTable } from "../datatable/DataTable.js";
import { DocumentRow } from "../datatable/DocumentRow.js";
import { PrimaryDocumentRow } from "../datatable/PrimaryDocumentRow.js";

/**
 *
 * @typedef {Object}       BeginDocumentShareResult
 * @property {string}      invocationId
 * @property {Parameter[]} parameters
 */

/**
 * @typedef  {Object} Module
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} version
 */

export class DocumentShareDialog extends DialogPanel {

	_initWrapId() {
		this._wrapId = 'shareDialog';
	}

	_initTitle() {
		this._title = 'Partage de documents';
	}

	setModuleContent(value) {
		this.clearContent();
		this._documents = value.documents;
		let  documentCount = this._documents.length;
		this._modules = value.modules;
		
		if(this._modules.length == 0){
			const message = "Il n'y a pas d'interfaces paramétrées.";
			const messageContent = new MessageContent({message});
			messageContent.addClass('center');
			messageContent.addClass('emptyMessage');
			this.content = [messageContent];
			return;
		}

		let pluralCharacter = (documentCount > 1) ? 's': '';
		let content = [];

		

		this._moduleButtons = this._modules.map(module => new ModuleButton({module: module}));
		Array.prototype.push.apply(content, this._moduleButtons);
		
		let headings = [`${documentCount} élément${pluralCharacter} sélectionné${pluralCharacter}`];
		let rowBuilder = item => new DocumentRow({ value: item.fileName });
		let dataTable = new DataTable({ headings: headings, items: this._documents, rowBuilder: rowBuilder });
		
		content.push(dataTable);
		this.content = content;

		this._moduleButtons.forEach(moduleButton => {
			moduleButton.addEventListener('moduleClick', (event) => {
				this._moduleButtons.forEach(mb => mb.clearEventListeners('moduleClick'));
				this.fireEvent(new CustomEvent('beginShare', {
					detail: {
						module: event.detail.module, 
						documents: this._documents
					}
				}));
			});
		});
	}
 
	setPrimaryDocumentFormContent(value) {
		this.clearContent();
		this._invocationId = value.invovationId;
		let selectBoxDocuments = this._documents.map(document => {
			return {'value': document.metadataMap.documentId, 'label': document.fileName};
		});
		let dataTableDocuments = this._documents.map(document => {
			return {'document': document, 'primaryDocumentId': this._documents[0].metadataMap.documentId};
		});
		let content = [];
	
		this._primaryDocumentForm = new PrimaryDocumentForm({items: selectBoxDocuments});
		content.push(this._primaryDocumentForm);
		
		let headings = ['Document à transmettre', 'Type de document']
		let rowBuilder = item => new PrimaryDocumentRow({ value: item});
		this._dataTable = new DataTable({ headings: headings, items: dataTableDocuments, rowBuilder: rowBuilder });
		content.push(this._dataTable);
		
		this.content = content;
		
		const primaryDocumentEvent = () => {
			this.fireEvent(new CustomEvent('endShare', {
				detail: {
					valueMap: {"@primaryDocumentId": this._primaryDocumentForm.primaryDocumentId},
					invocationId: this._invocationId
				}
			}));
		};

		const buttons = [{
			text: 'Transmettre les documents',
			buttonType: '',
			eventType: 'click',
			buttonForm: this._primaryDocumentForm.wrapId,
			listener: primaryDocumentEvent
		}];
		this.buttons = buttons;
		
		this._primaryDocumentForm.addEventListener('primaryDocumentChange', (event) => {
			this._dataTable.items = this._documents.map(document => {
				return{'document': document, 'primaryDocumentId': event.detail.primaryDocumentId}
			});
		});
	}

	show(value) {
		if (value.content.primaryDocument) {
			this.setPrimaryDocumentFormContent(value.content)
		} else {
			this.setModuleContent(value.content);
		}
		super.show(this);
	}
}