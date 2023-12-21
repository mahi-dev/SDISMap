import {Component} from "../Component.js";

export class DataTableCell extends Component {

    set cell(value) {
        this._cell = value
    }

    set value(value) {
        this._value = value
    }

    set addOrder(value) {
        this._orderIcon = value ? `<div class="sort"></i><i class="fas fa-sort-up"></i><i class="fas fa-sort-down"></i></div></div>` : ``
    }

    bindEvents() {
        if (this.dom.querySelector('.fas')) {
            this.dom.querySelector('.fa-sort-up').addEventListener('click', () => this.fireEvent(new CustomEvent('sortColumn', {
                detail: {sortBy: ` ${this._value} ASC`, element: this.dom.querySelector('.sort')}
            })));
            this.dom.querySelector('.fa-sort-down').addEventListener('click', () => this.fireEvent(new CustomEvent('sortColumn', {
                detail: {sortBy: ` ${this._value} DESC`, element: this.dom.querySelector('.sort')}
            })));
        }
    }

    toHtml() {
        return `<div class="table-cell">${this._cell}${this._orderIcon}</div>`;
    }
}
