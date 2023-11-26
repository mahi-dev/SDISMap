import {Button} from './Button.js';

export class ModuleButton extends Button {

	/**
	 * @constructor
	 */
	constructor(options) {
		super(options);
		this.wrapId = this._generateId('moduleButton');
	}

	set module(value) {
		this._module = value;
	}

    initComponents() {
		const version = this._module.version;
		const img = document.createElement('img');
		img.src = `public/resources/img/${this._module.code}.png`;
		img.classList.add('img-fluid');
		let versionNode = null;

		if (version) {
			versionNode = document.createElement('p');
			versionNode.classList.add('text-center');
			versionNode.textContent = version;
		}

		img.onload = () => {
			this.dom.appendChild(img);

			if (versionNode) {
				versionNode.setAttribute('style', 'margin: 0');
				this.dom.appendChild(versionNode);
			}

		};
		img.onerror = () => {
			const nameNode = document.createElement('p');
			nameNode.classList.add('text-center');

			if (!version)
				nameNode.setAttribute('style', 'line-height: 45px');

			nameNode.textContent = this._module.name;
			this.dom.appendChild(nameNode);

			if (versionNode)
				this.dom.appendChild(versionNode);
		}
	}

	/**
	 * @protected
	 * @returns {string} chaine HTML
	 */
	toHtml() {
		return '<div class="moduleButton wrap"></div>';
	}

	/**
	 * @protected
	 */
	bindEvents() {
		this.addDomEventListener('click', () => this.fireEvent(new CustomEvent('moduleClick', {detail: {module: this._module}})));
	}
}
