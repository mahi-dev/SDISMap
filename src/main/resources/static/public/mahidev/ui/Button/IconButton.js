import {Button} from './Button.js';

export class IconButton extends Button {

	set isDoubleIcon(value) {
		this._isDoubleIcon = value;
	}

	/**
	 * @public
	 * Setter du tooltip
	 * @param {String} value le tooltip à afficher
	 */
	set tooltip(value) {
		this.dom.title = value;
	}

	/**
	 * @public
	 * Setter de l'icône du boutton
	 * @param {String} value la classe FontAwsome à afficher
	 * Devra être remplacé par une source svg
	 */
	set icon(value) {
		this.dom.querySelectorAll('i')[0].setAttribute('class', value);
	}

		/**
	 * @public
	 * Setter de la deuxième icône du bouton
	 * @param {String} value la classe FontAwsome à afficher
	 * Devra être remplacé par une source svg
	 */
	set iconOver(value) {
		this.dom.querySelectorAll('i')[1].setAttribute('class', value);
	}

	toHtml() {
		const simpleIcon = `
			<a id="${this._id}" type="button" class="btn btn-primary wrap customButton">
				<i aria-hidden="true"></i>
			</a>`

		const doubleIcon = `
			<a id="${this._id}" type="button" class="btn btn-primary wrap customButton">
				<i aria-hidden="true"></i>
				<i aria-hidden="true"></i>
			</a>`

		return this._isDoubleIcon ? doubleIcon : simpleIcon;
	}
}
