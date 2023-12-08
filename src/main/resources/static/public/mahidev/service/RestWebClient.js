'use strict';

import {MimeTypeKeys} from '../lib/MimeTypeKeys.js';

export class RestWebClient {

    /**
     * @private
     * @async
     * @param {string} route
     * @param {Object | null} queryParameters
     * @param {string | null} responseType
     * @return {Promise<Any>}
     */
    get(route, queryParameters, responseType) {
        return this._invokeAsync('GET', route, queryParameters, null, null, responseType)
            .catch(error => {
                throw error;
            });
    }

    /**
     * @private
     * @async
     * @param {string} route
     * @param {Object | null} queryParameters
     * @param {MimeTypeKeys | null} bodyContentType
     * @param {Object | null} bodyInserter
     * @param {string | null} responseType
     * @return {Promise<Any>}
     */
    post(route, queryParameters, bodyContentType, bodyInserter, responseType) {
        return this._invokeAsync('POST', route, queryParameters, bodyContentType, bodyInserter, responseType)
            .catch(error => {
                throw error;
            });
    }

    /**
     * @private
     * @async
     * @param {string} route
     * @param {Object | null} queryParameters
     * @param {MimeTypeKeys | null} bodyContentType
     * @param {Object | null} bodyInserter
     * @param {string | null} responseType
     * @return {Promise<Any>}
     */
    put(route, queryParameters, bodyContentType, bodyInserter, responseType) {
        return this._invokeAsync('PUT', route, queryParameters, bodyContentType, bodyInserter, responseType)
            .catch(error => {
                throw error;
            });
    }

    /**
     * @private
     * @async
     * @param {string} route
     * @param {Object | null} queryParameters
     * @param {MimeTypeKeys | null} bodyContentType
     * @param {Object | null} bodyInserter
     * @param {string | null} responseType
     * @return {Promise<Any>}
     */
    delete(route, queryParameters, bodyContentType, bodyInserter, responseType) {
        return this._invokeAsync('DELETE', route, queryParameters, bodyContentType, bodyInserter, responseType)
            .catch(error => {
                throw error;
            });
    }

    /**
     * @private
     * @async
     * @param {string} httpMethod
     * @param {string} route
     * @param {Object | null} queryParameters
     * @param {String | null} bodyContentType
     * @param {Object | null} bodyInserter
     * @param {string | null} responseType
     * @return {Promise<Object>}
     */
    async _invokeAsync(httpMethod, route, queryParameters, bodyContentType, bodyInserter, responseType) {
        const init = {};

        let headers = new Headers(init);

        if (bodyContentType)
            headers.set('Content-Type', bodyContentType);

        if (bodyContentType === MimeTypeKeys.JSON)
            headers.set('json', 'true');


        let fetchInit = {
            method: httpMethod,
            headers: headers,
            credentials: 'include'
        }

        if (responseType)
            fetchInit['responseType'] = responseType;

        if (bodyInserter)
            fetchInit['body'] = bodyInserter;

        if (queryParameters)
            route += '?' + encodeURI(Object.keys(queryParameters).map(key => key + '=' + queryParameters[key]).join('&'));


        return fetch(route, fetchInit)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return responseType === MimeTypeKeys.JSON ? response.json() : response;
            })
            .catch(error => {
                throw error;
            });
    }

}
