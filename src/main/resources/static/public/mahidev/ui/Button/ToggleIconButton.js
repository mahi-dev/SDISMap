import {
	IconButton
} from "./IconButton.js";

export class ToggleIconButton extends IconButton {

	static BUTTON_A = '1';
	static BUTTON_B = '2';

	set showButton(value) {
		this.isDoubleIcon = false;
		this.tooltip = value.name;
		this.icon = value.icon;
	}

	set shownButton(value) {
		this._shownButton = value;
	}

	set button_a(value) {
		this._button_a = {
			button: ToggleIconButton.BUTTON_A
		};
		this._button_a.name = (value.hasOwnProperty('name')) ? value.name : 'no_name';
		this._button_a.icon = (value.hasOwnProperty('icon')) ? value.icon : 'no_icon';
	}

	set button_b(value) {
		this._button_b = {
			button: ToggleIconButton.BUTTON_B
		};
		this._button_b.name = (value.hasOwnProperty('name')) ? value.name : 'no_name';
		this._button_b.icon = (value.hasOwnProperty('icon')) ? value.icon : 'no_icon';
	}

	set noBorder(value){
		this[value ? 'addClass' : 'removeClass']('noborder');
		this[value ? 'addClass' : 'removeClass']('anchorfilterbtn');
	}
	
	initComponents() {
		this.disable = false;
	}

	bindEvents() {
		this.dom.addEventListener('click', this._changeIcon.bind(this));
	}

	createButton(name, icon) {
		return {
			name,
			icon
		};
	}

	show(name_a, icon_a, name_b, icon_b) {
		this.button_a = {
			name: name_a,
			icon: icon_a
		};
		this.button_b = {
			name: name_b,
			icon: icon_b
		};
		this.showButton = this._getButton(this._shownButton);
	}

	_getButton(value) {
		return (value === ToggleIconButton.BUTTON_B) ? this._button_b : this._button_a;
	}

	_changeIcon() {
		this.shownButton = (this._shownButton === ToggleIconButton.BUTTON_B) ? ToggleIconButton.BUTTON_A : ToggleIconButton.BUTTON_B;
		this.showButton = this._getButton(this._shownButton);
		this.fireEvent(new CustomEvent('toogleEvent', {
			detail: {
				button: this._shownButton
			}
		}));

	}
}