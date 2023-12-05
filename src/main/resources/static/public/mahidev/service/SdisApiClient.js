'use strict';

import {MimeTypeKeys} from '../lib/MimeTypeKeys.js';


export class SdisApiClient {


    static IMPORT_ENDPOINT = '/import';

    static FILTER_ENDPOINT = '/filter';

    static FILTERS_ENDPOINT = '/filters';

    constructor(restWebClient, url, api) {
        this._delegate = restWebClient;
        this._serviceUrl = url + api;
    }

    importSdis() {
        return this._delegate.get(this._serviceUrl + SdisApiClient.IMPORT_ENDPOINT, null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    getAllSdis() {
        return this._delegate.get(this._serviceUrl + "/", null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    getFilters() {
        return this._delegate.get(this._serviceUrl + SdisApiClient.FILTERS_ENDPOINT, null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    filterSdis(filters) {
        return this._delegate.get(this._serviceUrl + SdisApiClient.FILTER_ENDPOINT, filters, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    filterSdisByLocation(latitude, longitude) {
        return this._delegate.get(this._serviceUrl + "/location", {latitude, longitude}, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    findFilteredSdis(searchTerm, filters) {
        const parameter = (!searchTerm) ? '' : `/${encodeURI(searchTerm)}`
        return this._delegate.get(this._serviceUrl + SdisApiClient.FILTER_ENDPOINT + parameter, filters, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    getFilteredSdis(names, anfrNumbers, inseeSites, municipalities, postalCodes) {
        return this._delegate.get(this._serviceUrl + SdisApiClient.FILTER_ENDPOINT, {
            names,
            anfrNumbers,
            inseeSites,
            municipalities,
            postalCodes
        }, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    getSdis(id) {
        return this._delegate.get(this._serviceUrl + `/${encodeURI(id)}`, null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    countSdis() {
        return this._delegate.get(this._serviceUrl + "/count", null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    searchSdis(searchTerm) {
        return this._delegate.get(this._serviceUrl + `/search/${encodeURI(searchTerm)}`, null, MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }

    importSdisFromFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._delegate.post(
            this._serviceUrl + SdisApiClient.IMPORT_ENDPOINT,
            null,
            '',
            formData,
            MimeTypeKeys.JSON)
            .catch(error => {
                throw error;
            });
    }
}
