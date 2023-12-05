import {Component} from '../Component.js';

export class Input extends Component {

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('input');
    }

    get label() {
        return this.dom.querySelector('label');
    }

    set label(value) {
        this._label = value;
    }

    set inputType(value) {
        this._inputType = value;
    }

    set inputPlaceholder(value) {
        this._inputPlaceholder = value;
    }

    get input() {
        return this.dom.querySelector('input');
    }

    get value() {
        return this.input.value;
    }

    set maxlength(value) {
        this.input.setAttribute("maxlength", value);
    }

    set required(value) {
        if (value) {
            this.input.setAttribute("required", "");
            return;
        }
        this.input.removeAttribute("required");
    }

    set border(color) {
        this.input.style.border = `2px solid ${color}`;
    }

    bindEvents() {
        this.inputEvent = this._inputEvent.bind(this);
        this.input.addEventListener('input', this.inputEvent);
    }

    unbindEvents() {
        this.input.removeEventListener('input', this.inputEvent);
    }

    detach() {
        this.unbindEvents();
        this.dom.remove();
    }

    toHtml() {
        return `
	        <div class="form-group">
	            <label for="${this.wrapId}_${this._inputType}">${this._label}</label>
	            <input type="${this._inputType}" id="${this.wrapId}_${this._inputType}" class="form-control" placeholder="${this._inputPlaceholder}"/>
	        </div>
		`;
    }

    _inputEvent(event) {
        this.fireEvent(new CustomEvent('inputEvent', {detail: {value: this._formatValue(event.target.type, event.target.value)}}));
    }

    _formatValue(type, value) {
        return (type === 'date') ? toISOString(value) : value;
    }
}
