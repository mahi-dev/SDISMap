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

    set switchButtonVisible(value) {
        this._switchButton.visible = value;

    }

    set switchButtonActive(value) {
        this._switchButtonActive = value;

    }

    set switchButtonName(value) {
        this._switchButtonName = value;
    }

    get switchButtonState() {
        return this._switchButton.state;
    }

    set informationIcon(value) {
        this._tooltips = value.tooltips;
        this._icon = value.icon;
        this._visible = value.visible;
    }

    set informationIconVisible(value) {
        this._informationIcon.visible = value;
    }

    initComponents() {
        this._wrapId = 'contextualSearch';
        this._switchButton = new Switch({name: this._switchButtonName, default: this._switchButtonActive});
        this._switchButton.attach(this.dom.querySelector('.switchButton'));
        this._informationIcon = this._createTooltipsIcon(this._generateId('informationIcon'), this._tooltips, this._icon, this._visible);
    }

    bindEvents() {
        const isSearchEventSupported = navigator.userAgent.includes("Chrome");
        const searchEvent = () => this.fireEvent(new CustomEvent('searchClick',
            {detail: {search: this.inputSearch, toggleState: this.switchButtonState}}));

        this.dom.querySelector('input').addEventListener(isSearchEventSupported ? 'search' : 'keydown',
            isSearchEventSupported ? searchEvent : e => {
                if (e.key === 'Enter') searchEvent();
            });

        this._switchButton.addEventListener('toggleEvent', e => this.fireEvent(new CustomEvent('toggleEvent', {
            detail: {
                toggleEvent: e.detail
            }
        })));
    }

    toHtml() {
        return `<div class="form-group contextualsearch">
                        <input autocomplete="off" class="form-control" type="search" placeholder="Recherche">
                        <div class="switchButton"></div>
                </div>`;
    }

    _createTooltipsIcon(id, tooltip, icon, visible) {
        const button = new IconAnchorButton({isDoubleIcon: false, id: id});
        button.attach(this.dom.querySelector('.switchButton'));
        button.icon = icon;
        button.tooltip = tooltip;
        button.disable = false;
        button.visible = visible;
        return button;
    }
}
