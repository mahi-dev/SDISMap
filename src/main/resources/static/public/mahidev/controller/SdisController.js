export class SdisController {

    constructor(service, map, panel) {
        this._service = service;
        this._map = map;
        this._sidePanel = panel
    }

    get principalElement() {
        return document.querySelector('.principal');
    }

    createMap(data) {
        this._map.attach(this.principalElement);
        this._map.sdisData = data;
        this._map.initMap();
        this._map.setSdisMarker(data?.sdisList);
    }

    async createSidePannel(closeButtonVisible = false) {
        this._sidePanel.attach(this.principalElement);
        this._sidePanel.closeButtonVisible = closeButtonVisible;
        this._sidePanel.addEventListener('searchClick', e => this.search(e?.detail?.search?.value));

        this._filters = await this.getFilters();
    }

    async search(value) {
        if (!value) this._data = await this.getAllAsync();
        else this._data = await this.searchAsync(value);
        if (this._data?.count >= 0) {
            console.log(`results count :${this._data.count}`)
            this._map.removeAllMarkers();
            this._map.sdisData = this._data;
            this._map.fitBound(this._data?.sdisList);
            this._map.setSdisMarker(this._data?.sdisList);
        } else {
            //@Todo message dialog
            console.log('No Results')
        }
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
}
