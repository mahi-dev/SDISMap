import {Component} from "../Component.js";

export class DocumentMetadataRow extends Component {

	set value(value) {
		this._value = value;
	}

	set tooltips(value){
		this._tooltips = value
	}

	toHtml() {
		return `
			<div style="display: table-row;">
				<div style="display: table-cell;" class="metadataKey" title="${this._currentTooltip(this._value[0])}">${this._value[0]}</div>
				<div style="display: table-cell;" class="metadataValue">${this._value[1]}</div>
			</div>`;
	}

	_currentTooltip(value){
		return (!!this._tooltips && this._tooltips.hasOwnProperty(value)) ? this._tooltips[value] : value;
	}
}