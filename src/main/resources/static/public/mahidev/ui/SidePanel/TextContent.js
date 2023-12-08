import {Component} from "../Component.js";

export class TextContent extends Component {

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('text_content');
    }

    set textValue(value) {
        this._textValue = value;
    }

    set updateText(value) {
        this.dom.querySelector('p').textContent = value;
    }

    set boldText(value) {
        this.dom.querySelector('p').style['font-weight'] = value ? 'bold' : 'normal';
    }

    toHtml() {
        return `<div id="${this.wrapId}" class="textContent row">
                    <p>${this._textValue}</p>
            </div>
        `;
    }
}
