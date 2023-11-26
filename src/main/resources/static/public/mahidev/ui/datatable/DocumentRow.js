import {Component} from "../Component.js";

export class DocumentRow extends Component {

	set value(value) {
		this._value = value;
	}

	toHtml() {
		return `
			<div class="datatable__row" style="display: table-row;">
				<div style="display: table-cell;">${this._value}</div>
			</div>`;
	}
}