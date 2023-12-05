import {Component} from "../Component.js";

export class TabHeader extends Component {

    constructor(option) {
        super(option);
    }

    set name(value) {
        this._name = value;
    }

    set index(value) {
        this._index = value;
    }


    bindEvents() {
        this.tabHeaderEvent = this._tabHeaderEvent.bind(this);
        this.dom.addEventListener('click', this.tabHeaderEvent);
    }

    unbindEvents() {
        this.dom.removeEventListener('click', this.tabHeaderEvent);
    }

    _tabHeaderEvent(event) {
        this.fireEvent(new CustomEvent('tabHeaderEvent', {detail: {event, index: this._index, name: this._name}}));
    }


    detach() {
        this.unbindEvents();
        this.dom.remove();
    }

    toHtml() {
        return `<button class='tablinks'>${this._name}</button>`;
    }
}
