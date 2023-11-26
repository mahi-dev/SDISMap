import {Component} from "../Component.js";

export class Header extends Component {

  set name(value) {
    this.dom.querySelector('h1').innerText = value;
  }

  set logo(value){
    this.dom.querySelector('img').src = value;
  }

  toHtml() {
    return `
		<header id="explorerHeader" class="page-header col-sm-12">
      <img class="page-header__logo" alt="Marco">
			<h1 class="page-header__title" ></h1>
		</header>
	`;
	}
}