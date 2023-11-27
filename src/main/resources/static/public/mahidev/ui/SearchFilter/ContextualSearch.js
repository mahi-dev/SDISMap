import {IconAnchorButton} from "../Button/IconAnchorButton.js";
import {Switch} from "../Button/Switch.js";
import {Component} from "../Component.js";

export default class ContextualSearch extends Component {

    set inputValue(value) {
        this.dom.querySelector('input').value = value;
    }

    get inputSearch() {
        return this.dom.querySelector('input').value;
    }

    initComponents() {
        this._wrapId = 'contextualSearch';
    }

    bindEvents() {
        const isSearchEventSupported = navigator.userAgent.includes("Chrome");
        const searchEvent = () => this.fireEvent(new CustomEvent('searchClick',
            {detail: {search: this.inputSearch, toggleState: this.switchButtonState}}));

        this.dom.querySelector('input').addEventListener(isSearchEventSupported ? 'search' : 'keydown',
            isSearchEventSupported ? searchEvent : e => {
                if (e.key === 'Enter') searchEvent();
            });

    }

    toHtml() {
        return `<div class="form-group contextualsearch">
                        <input autocomplete="off" class="form-control" type="search" placeholder="Recherche">
                </div>`;
    }

}
