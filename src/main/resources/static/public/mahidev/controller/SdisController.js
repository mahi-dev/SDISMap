import {MESSAGE} from "../config/message.js";
import {SelectionBox} from "../ui/form/SelectionBox.js";
import DropArea from "../ui/Upload/DropArea.js";
import {MessageDialog} from "../ui/Dialog/MessageDialog.js";

export class SdisController {

    constructor(service, map) {
        this._service = service;
        this._map = map;
        this._currentFilters = {};
        this.infoModal = new MessageDialog(this.principalElement);
    }

    set sidePanel(value) {
        this._sidePanel = value
    }

    get principalElement() {
        return document.querySelector('.principal');
    }

    get uploadElement() {
        return document.querySelector('.upload');
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
        //this._map.setSdisMarker(data?.sdisList);
        this._map.setSdisMarkerByLocation(data?.sdisList);
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
        let message = 'Pas de nouveau point à ajouter.';
        if (data?.count > 0) {
            message = `${data.count} nouveaux points ajoutés.`;
            this._map.removeAllMarkers();
            this._map.sdisData = data;
            this._map.fitBound(data?.sdisList);
            //this._map.setSdisMarker(data?.sdisList);
            this._map.setSdisMarkerByLocation(data?.sdisList);
        }
        this.infoModal.show({
            title: 'Info',
            content: {message}
        });
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

    crateDropArea() {
        this._dropArea = new DropArea();
        this._dropArea.attach(this.uploadElement);
        this.uploadEvent(this._dropArea.dom);
    }

    uploadEvent(dropArea) {
        const preventDefaults = (e) => {
            e.preventDefault()
            e.stopPropagation()
        }

        const highlight = (e) => {
            dropArea.classList.add('highlight')
        }

        const unhighlight = (e) => {
            dropArea.classList.remove('highlight')
        }

        const handleDrop = (e) => {
            this.files = e.dataTransfer.files;
            this.upload();
        }

        const handleFiles = (files) => {
            this.files = [...files.target.files];
            this.upload();
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });

        dropArea.addEventListener('drop', handleDrop, false)

        let parcourir = document.getElementById("fileElem");
        parcourir.addEventListener('change', handleFiles, false)
    }

    async upload() {
        for (const file of this.files) {
            const sdisData = await this._service.importSdisFromFile(file)
                .catch((e) => {
                    e.json().then((error) => {
                        const title = `Erreur inattendue`;
                        this.infoModal.show({
                            title,
                            content: {message: error.message}
                        });
                        console.error(title, error);
                    });
                });
            this.reloadMap(sdisData);
        }
        this._dropArea.reset();
    }
}
