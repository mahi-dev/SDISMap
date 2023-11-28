import {MESSAGE} from "../config/message.js";
import {SelectionBox} from "../ui/form/SelectionBox.js";

export class SdisController {

    constructor(service, map) {
        this._service = service;
        this._map = map;
        this._currentFilters = {};
    }

    set sidePanel(value) {
        this._sidePanel = value
    }

    get principalElement() {
        return document.querySelector('.principal');
    }

    get _contextualSearchValue() {
        return document?.querySelector('.contextualsearch input')?.value;
    }

    createMap(data) {
        if (!data) throw new Error(MESSAGE.ERROR.NO_DATA);
        if (!this._map) throw new Error(MESSAGE.ERROR.NO_MAP);
        this._map.attach(this.principalElement);
        this._map.sdisData = data;
        this._map.initMap();
        this._map.setSdisMarker(data?.sdisList);
    }

    createSidePanel(panel, closeButtonVisible = false) {
        if (!panel) throw new Error(MESSAGE.ERROR.NO_PANEL);
        this._sidePanel = panel;
        this._sidePanel.attach(this.principalElement);
        this._sidePanel.closeButtonVisible = closeButtonVisible;
        this._sidePanel.addEventListener('searchClick', e => this.search(e?.detail?.search?.value));
        this._sidePanel.addEventListener('filter', e => this.filter(e));
    }

    reloadMap(data) {
        if (data?.count >= 0) {
            console.log(`results count :${data.count}`)
            this._map.removeAllMarkers();
            this._map.sdisData = data;
            this._map.fitBound(data?.sdisList);
            this._map.setSdisMarker(data?.sdisList);
        } else {
            //@Todo message dialog
            console.log('No Results')
        }
    }

    async search(value) {
        this._data = await this._searchFilteredSdis(value, this._currentFilters);
        this.reloadMap(this._data);
    }

    async filter(event) {
        const filter = event?.detail?.filter;
        const option = event?.detail?.option;
        if (option === SelectionBox.NO_VALUE)
            delete this._currentFilters[filter];
        else this._currentFilters[filter] = option;
        this._data = await this._searchFilteredSdis()
        this.reloadMap(this._data);
    }

    async searchFilteredSdis(searchTerm, filters) {
        return await this._service.findFilteredSdis(searchTerm, filters);
    }

    async filterSdis(value) {
        return await this._service.filterSdis(value);
    }

    async getFilters() {
        return await this._service.getFilters();
    }

    async searchAsync(value) {
        return await this._service.searchSdis(value);
    }

    async countAsync() {
        return await this._service.countSdis();
    }

    async importAsync() {
        return await this._service.importSdis();
    }

    async getAllAsync() {
        return await this._service.getAllSdis();
    }

    _searchFilteredSdis() {
        return this.searchFilteredSdis((!this._contextualSearchValue) ? "" : this._contextualSearchValue, this._currentFilters);
    }
}
