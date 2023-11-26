import {DialogPanel} from "./DialogPanel.js";
import {CheckinForm} from "./CheckinForm.js";
import {Checkin} from "../../service/Checkin.js";

export class CheckinDialog extends DialogPanel {

	_initRequiredClasses() {
		this._checkin = new Checkin();
	}

	_initWrapId() {
		this._wrapId = 'checkinDialog';
	}

	_initTitle() {
		this._title = 'Archiver le document';
	}

	_initContent(value) {
		let content = {};

		this.checkinForm = new CheckinForm();

		content.checkinForm = this.checkinForm;

		this.documentInfo = value.documentInfo;

		this.content = content;
	}

	_initButtons() {
		let checkinListener = () => {
			this.fireEvent(new CustomEvent('spinnerOn'));
			this._checkin.checkinFile(this, this.documentInfo);
			this.hide();
			this.detach();
		}
		let buttons = [{ text: 'Archiver le document', buttonType: 'submit', eventType: 'click', listener: checkinListener }];

		this.buttons = buttons;
	}
}