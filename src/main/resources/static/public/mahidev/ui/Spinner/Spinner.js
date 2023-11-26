import { Component } from "../Component.js";

export class Spinner extends Component {

    set isSpinnerActive(value) {
		this.dom.classList[value ? 'remove' : 'add']('invisible');
	}

    set logo(value){
        this.dom.classList.add(value);
    }

    toHtml(){
        return `<div id="bui_block" class="fas spinner invisible"/>`
    }
}