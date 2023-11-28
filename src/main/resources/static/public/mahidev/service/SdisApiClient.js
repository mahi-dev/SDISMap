'use strict';

import {MimeTypeKeys} from '../lib/MimeTypeKeys.js';


export class SdisApiClient {


    static IMPORT_ENDPOINT = '/import';

    constructor(restWebClient, url, api) {
        this._delegate = restWebClient;
        this._serviceUrl = url + api;
    }

    importSdis() {
        return this._delegate.get(this._serviceUrl + SdisApiClient.IMPORT_ENDPOINT, null, MimeTypeKeys.JSON);
    }

    getAllSdis() {
        return this._delegate.get(this._serviceUrl + "/", null, MimeTypeKeys.JSON);
    }

    getFilters() {
        return this._delegate.get(this._serviceUrl + "/filters", null, MimeTypeKeys.JSON);
    }

    filterSdis(filters) {
        return this._delegate.get(this._serviceUrl + "/filter", filters, MimeTypeKeys.JSON);
    }

    findFilteredSdis(searchTerm, filters) {
        const parameter = (!searchTerm) ? '' : `/${encodeURI(searchTerm)}`
        return this._delegate.get(this._serviceUrl + `/filter${parameter}`, filters, MimeTypeKeys.JSON);
    }

    getFilteredSdis(names, anfrNumbers, inseeSites, municipalities, postalCodes) {
        return this._delegate.get(this._serviceUrl + "/filter", {
            names,
            anfrNumbers,
            inseeSites,
            municipalities,
            postalCodes
        }, MimeTypeKeys.JSON);
    }

    getSdis(id) {
        return this._delegate.get(this._serviceUrl + "/", {id}, MimeTypeKeys.JSON);
    }

    countSdis() {
        return this._delegate.get(this._serviceUrl + "/count", null, MimeTypeKeys.JSON);
    }

    searchSdis(searchTerm) {
        return this._delegate.get(this._serviceUrl + `/search/${encodeURI(searchTerm)}`, null, MimeTypeKeys.JSON);
    }

    importSdisFromFile(file) {
        return this._delegate.post(
            this._serviceUrl + SdisApiClient.IMPORT_ENDPOINT,
            null,
            MimeTypeKeys.MULTIPART_FORM,
            new URLSearchParams({file}),
            MimeTypeKeys.JSON);
    }
}
