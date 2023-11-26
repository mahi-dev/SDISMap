import { AnchorButton } from "../Button/AnchorButton.js";
import { CustomFilterPanel } from "./CustomFilterPanel.js";
import { CctpSidePanel } from "../../../../../cctp/public/agysoft/ui/sidepanel/CctpSidePanel.js";

export class SidePanel extends CctpSidePanel {

    set customFilters(value) {
        this._customFilters = value;
    }

    set addFilterButton(value) {
        this._customFilterPanel.addFilter(value);
    }

    set removeFilter(id) {
        this._customFilterPanel.removeFilter(id);
    }

    set addFilterVisible(value){
        this._addFilterButton.visible = value;
    }

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('sidePanel');
    }

    initComponents() {
        super.initComponents();
        
        this._addFilterButton = new AnchorButton({
            id: 'addFilterButton',
            value: "Ajouter un filtre",
            href: ""
        });
        this._addFilterButton.attach(this.dom);
        this._addFilterButton.removeAttribute('href');
        this._addFilterButton.addClass('anchorfilterbtn');
        this._addFilterButton.addClass('mb-4');
        this._addFilterButton.addClass('mt-4');

        this._customFilterPanel = new CustomFilterPanel({
            customFilters: this._customFilters
        });
        this._customFilterPanel.attach(this.dom);
    }

    bindEvents() {
        super.bindEvents();
        this._addFilterButton.addEventListener('click', () => this.fireEvent(new CustomEvent('showFilterDialog')));
        this._customFilterPanel.addEventListener('filter', e => this.fireEvent(new CustomEvent('filter', {
            detail: {
                filter: e.detail.filter,
                add: e.detail.add
            }
        })));
        this._customFilterPanel.addEventListener('remove', e => this.fireEvent(new CustomEvent('removeCustom', {
            detail: {
                event: e.detail.event,
                filter: e.detail.filter,
            }
        })));
    }
}
