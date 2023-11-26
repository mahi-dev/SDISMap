import {Component} from '../Component.js';
import {FilterButton} from '../Button/FilterButton.js';
import {AnchorButton} from '../Button/AnchorButton.js';

export class FilterBar extends Component {

	set id(value) {
		this._id = value;
	}

	set filters(value) {
		this._filters = value;
	}

    set foldIcon(value){
        this._showPanelButton.dom.innerHTML = value ? "<<" : ">>";
    }

    initComponents() {

      this._initSidePanel();

        this._filters.forEach(filter => {
            let filterButton = new FilterButton({ id: filter.id });
            filterButton.addEventListener('click', this._addFilter.bind(this));
            filterButton.attach(this.dom);
            filterButton.name = filter.name;
            filterButton.data = filter.metadataFilter;
        });
    }

    toHtml() {
        return `<div id=${this._id} class="row mb-1 filterBar"></div>`;
    }

    _initSidePanel(){
        this._showPanelButton = new AnchorButton({ id: 'hamburgerButton', value: ">>" });
        this._showPanelButton.addEventListener('click', () => this.fireEvent(new CustomEvent('togglePanel')));
		this._showPanelButton.attach(this.dom);
        this._showPanelButton.removeAttribute('href');
		this._showPanelButton.addClass("anchorfilterbtn");
        this._showPanelButton.addClass("noborder");
        this._showPanelButton.tooltip = 'Afficher/Masquer le panneau latéral';
    }

    /**
     * @private
     * Evenement d'ajout/retrait d'un filtre
     * @param {Event} event
     * @param {Json} filter objet contenant le matadata de filtre
     */
    _addFilter(event) {
        event.preventDefault();
        event.stopPropagation();
        let current = event.target;
        let filter = JSON.parse(current.getAttribute('data'))
        current.blur()
        let classList = current.classList;
        let add = true;
        if (classList.contains('active')) {
            add = false;
            classList.remove('active');
        } else classList.add('active');
        this.fireEvent(new CustomEvent('filter', {
            detail: { filter, add }
        }));
    }
}