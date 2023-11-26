'use strict';

import {getAccesTokenAsync} from '../../oidc/accesToken-handler.js';
import {MimeTypeKeys} from '../lib/MimeTypeKeys.js';

export class RestServiceClient {

    static APPLICATION_JSON = 'application/json'

    static APPLICATION_JSON_UTF8 = 'application/json;charset=UTF-8';

    static APPLICATION_URL_ENCODED = "application/x-www-form-urlencoded";

    get _headers() {
        return {};
    }

    get getAccessTokenAsync(){
        return getAccesTokenAsync();
    }

    constructor(url) {
        this._serviceUrl = url;
    }
   
    /**
     * @public
     *
     * @param {string} method
     * @param {string} url
     * @param {string | null} contentType
     * @param {Object | null} payload
     * @param {string | null} responseType
     * @returns {Promise<any>}
     */
    fetch(method, url, contentType, payload, responseType) {
        return this.getAccessTokenAsync()
           .then(user => {
               const requestHeaders = new Headers({
                   Authorization: `Bearer ${user.access_token}`
               });

               for (const key in this._headers) {
                    requestHeaders.set(key, this._headers[key]);
               }

               if (contentType) {
                   requestHeaders.set('Content-Type', contentType);
                   if (contentType === MimeTypeKeys['JSON']) {
                       requestHeaders.set('json', 'true');
                   }
               }

               const fetchInit = {
                   method: method,
                   headers: requestHeaders,
                   credentials: 'include'
               };

               if (method !== 'GET' && payload !== null && payload !== undefined) {
                   fetchInit.body = payload;
               }

               if (responseType) {
                   fetchInit.responseType = responseType;
               }

               return fetch(url, fetchInit);
           }).catch(err => {
            console.error('Erreur d\'authentification', err.message)
        });
    }

    /**
     * @private
     *
     * @param {Object} response
     * @returns {Promise<Object>|Promise<Error>}
     */
    httpStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    }

}