import {Component} from "../Component.js";

export class Header extends Component {

    set name(value) {
        this.dom.querySelector('h1').innerText = value;
    }

    set logo(value) {
        this.dom.querySelector('img').src = value;
        this.dom.querySelector('img').addEventListener('click', e => this.fireEvent(new CustomEvent('headerLogoClick')));
        this.dom.querySelector('img').addEventListener('error', e => this.fireEvent(new CustomEvent('headerLogoError')));

    }

    set logoWidth(value) {
        this.dom.querySelector('img').style['width'] = value;
    }

    set alt(value) {
        this.dom.querySelector('img').alt = value;
    }

    toHtml() {
        return `
		<header id="sdisHeader" class="page-header col-sm-12">
            <img class="page-header__logo" alt="SDIS">
			<h1 class="page-header__title" ></h1>
		</header>
	`;
    }
}
