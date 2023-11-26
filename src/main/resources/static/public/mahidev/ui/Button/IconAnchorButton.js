import { IconButton } from './IconButton.js';

export class IconAnchorButton extends IconButton {

	initComponents(){
		super.initComponents();
		this.addClass('anchorfilterbtn');
		this.addClass('noborder');
	}

	set disable(value){
		super.disable = value;
		this.dom.classList[value ? 'add' : 'remove']('anchorDisabled');
	}

}
