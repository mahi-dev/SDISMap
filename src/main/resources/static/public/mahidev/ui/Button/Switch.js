import { Component } from "../Component.js";

export class Switch extends Component {

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('switch');
    }

    set default(value){
        this._checked =  value ? 'checked' : '';
        this._state = !! value;
    }

    set name(value) {
        this._name = value;
    }

    set visible(value){
        this.dom.classList[value ? 'remove' : 'add']('hidden');
    }

    get state(){
        return this._state;
    }

    toHtml() {
        return `<label id="${this.wrapId}" class="toggle hidden">
            <input class="toggle-checkbox" type="checkbox" ${this._checked}>
            <div class="toggle-switch"></div>
            <span class="toggle-label">${this._name}</span>
        </label>`;
    }
    
	bindEvents(){
		this._changeEvent = this._onChange.bind(this);
        this.dom.querySelector('input').addEventListener('change', this._changeEvent);
	}

    unbindEvents() {
        this.dom.querySelector('input').removeEventListener('change', this._changeEvent);
	}

    _onChange() {
        this._state = !this.state;
        this.fireEvent(new CustomEvent('toggleEvent', { detail: this.state }));
    }
}