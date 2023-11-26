import { DialogPanel } from './DialogPanel.js';
import { MessageContent } from './MessageContent.js';

export class MessageDialog extends DialogPanel {

	_initWrapId() {
		this._wrapId = 'messageDialog';
	}

	_initTitle(value) {
		this._title = value;
	}

	_initContent(value) {
		let messageContent = new MessageContent({ value: value.message });
		this.content = { message: messageContent };
	}

}