import {Component} from "../Component.js";

export class MessageContent extends Component {

	set value(value) {
		this._value = value;
	}

	toHtml() {
		return `<p>${this._value}</p>`;
	}
}
