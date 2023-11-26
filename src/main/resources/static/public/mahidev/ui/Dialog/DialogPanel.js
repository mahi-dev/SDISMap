import {Component} from "../Component.js";
import {DialogButton} from "./../Button/DialogButton.js";
import {AnchorButton} from "./../Button/AnchorButton.js";
import { FormButton } from "../Button/FormButton.js";

export class DialogPanel extends Component {

	constructor(parent, options) {
		super(options);
		this._initWrapId();
		this.attach(parent);
		this.items = [];
		this._initRequiredClasses();
	}

	_initRequiredClasses() {
	}

	_init(value) {
		this._initTitle(value.title);
		this._initContent(value.content);
		this._initButtons(value.buttons);
	}

	set _title(value) {
		this.dom.querySelector('.modal-title').innerText = value;
	}

	_initContent() {
	}

	set content(value) {
		this._attach('.modal-body', value);
	}

	_initButtons(value) {
        this.buttons = value;
    }

	set buttons(values) {
		if (values)
			for (const value of values) {
				let button = undefined;
				if (value.listener) {
					button = (value.buttonForm) ? new FormButton({ type: value.buttonType, value: value.text, form: value.buttonForm }) :
					 	new DialogButton({ type: value.buttonType, value: value.text });
					button.addEventListener(value.eventType, value.listener);
				}
				if (value.href) {
					button = new AnchorButton({ value: value.text, href: value.href });
				}
				this._attach('.modal-footer', [button]);
			}
	}

	initComponents() {
		super.initComponents();
		this._addCloseButton();
	}

	_addCloseButton() {
		this._closeButton = new DialogButton({ value: 'Fermer' });
		this._closeButton.addEventListener('click', () => {
				this.detach();
				this.hide();
			}
		);
		this._attach('.modal-footer', [this._closeButton]);
	}

	_attach(selector, value) {
		let element = this.dom.querySelector(selector);
		for (let component of Object.values(value)) {
			component.attach(element);
		}
	}

	toHtml() {
		return `
			<div id="${this.wrapId}" class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">${this.name}</h5>
						</div>
						<div class="modal-body">
						</div>
						<div class="modal-footer">
						</div>
					</div>
				</div>
			</div>`
	}
	
	clearContent() {
		this._detach('.modal-body');
	}

	detach() {
		this.unbindEvents();

		this._detach('.modal-body');
		this._detach('.modal-footer');

		/* On ne veut pas supprimer le bouton Fermer */
		// TODO implémenter une meilleure gestion du bouton Fermer
		this._addCloseButton();
	}

	_detach(selector) {
		let node = this.dom.querySelector(selector);
		while (node.firstChild) {
			node.removeChild(node.lastChild);
		}
	}

	show(value) {
		this._init(value);
		this.dom.setAttribute('style', 'padding-right: 17px; display: block;');
		this.dom.classList.add('show');
	}

	hide() {
		this.dom.removeAttribute('style');
		this.dom.classList.remove('show');
	}
}