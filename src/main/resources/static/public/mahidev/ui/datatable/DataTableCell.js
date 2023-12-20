import {Component} from "../Component.js";

export class DataTableCell extends Component {

    set cell(value) {
        this._cell = value
    }

    set addOrder(value) {
        this._orderIcon = value ? `<i class="fas fa-sort"></i><i class="fas fa-sort-up"></i><i class="fas fa-sort-down"></i>` : ``
    }

    bindEvents() {
        if (this.dom.querySelector('.fa-sort')) {
            this.dom.querySelector('.fa-sort').addEventListener('click', () => this.fireEvent(new CustomEvent('sort', {
                detail: {sort: true, cell: this._cell}
            })));
            this.dom.querySelector('.fa-sort-up').addEventListener('click', () => this.fireEvent(new CustomEvent('sort', {
                detail: {sort: 'ASC', cell: this._cell}
            })));
            this.dom.querySelector('.fa-sort-down').addEventListener('click', () => this.fireEvent(new CustomEvent('sort', {
                detail: {sort: 'DESC', cell: this._cell}
            })));
        }
    }

    toHtml() {
        return `<div class="table-cell">${this._cell}${this._orderIcon}</div>`;
    }
}
