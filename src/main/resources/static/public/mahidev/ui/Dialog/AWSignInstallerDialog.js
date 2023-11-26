import {DialogPanel} from "./DialogPanel.js";
import {MessageContent} from "./MessageContent.js";
import { UI_CONFIG } from '../../config/ui-config.js'
import * as AWSignExtensionUtils from '../../lib/awsignExtensionUtils.js';

export class AWSignInstallerDialog extends DialogPanel {

	_initWrapId() {
		this._wrapId = 'awsignInstallerDialog';
	}

	_initTitle() {
		this._title = 'Vérification d\'AW-Sign';
	}

	_init() {
		console.log('Init de AWSignInstallerDialog')
		AWSignExtensionUtils.isAWSignExtensionInstalledAndEnabledAsync().then(response => {
			this._AWSignExtensionInstalledAndEnabled = response;

			this._initTitle();
			this._initContent();
			this._initButtons();
		});
	}

	_initContent() {
		let content = {};

		if (this._AWSignExtensionInstalledAndEnabled) {
			content.message_1 = new MessageContent({ value: 'AW-Sign est installée et l\'extension est activée.' });
		} else {
			content.message_1 = new MessageContent({ value: 'AW-Sign n\'est pas installée ou l\'extension est désactivée (chrome://extensions).' });
			content.message_2 = new MessageContent({ value: 'Veuillez installer AW-Sign et tester à nouveau.' });
		}

		this.content = content;
	}

	_initButtons() {
		if (!this._AWSignExtensionInstalledAndEnabled) {
			let retestListener = () => {
				this.hide();
				this.detach();
				this.show();
			};

			let awsignInstallListener = () => {
				AWSignExtensionUtils.executeAWSignInstaller();
			};

			let buttons = [
				{ text: 'Installer AW-Sign', buttonType: 'button', eventType: 'click', href: UI_CONFIG.options.downloadLink },
				{ text: 'Tester à nouveau', buttonType: 'button', eventType: 'click', listener: retestListener }
			];

			super._initButtons(buttons);
		}
	}
}