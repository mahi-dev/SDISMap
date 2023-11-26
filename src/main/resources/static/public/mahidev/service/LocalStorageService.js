export default class LocalStorageService {

    get asyncLocalStorage() {
        return {
            setItem: (key, value) => {
                return Promise.resolve().then(() => {
                    localStorage.setItem(key, JSON.stringify(value));
                });
            },
            getItem: (key) => {
                return Promise.resolve().then(() => {
                    const item = (localStorage.getItem(key) !== null) ? localStorage.getItem(key) : '[]';
                    return JSON.parse(item);
                });
            },
            removeItem: (key) => {
                return Promise.resolve().then(() => {
                    localStorage.removeItem(key);
                });
            }
        };
    };

    /**
     * @async
     * ajoute les données à une storage
     * @param {String} storage
     * @param {JSON} data
     * @returns {Array} les données mis à jour
     */
    addAsync(storage, data) {
        return this.getAllAsync(storage).then(items => {
            items.push(data);
            this.setStorageAsync(storage, items);
            return items;
        })
    }

    /**
     * @async
     * retourne les données d'une storage
     * @param {String} storage
     * @returns {Promise}
     */
    getAllAsync(storage) {
        return this.asyncLocalStorage.getItem(storage);
    }

    /**
     * @async
     * retourne un document
     * @param {String} storage
     * @param {String} id
     * @returns {Promise}
     */
    getAsync(storage, id) {
        return this.getAllAsync(storage).then(data => {
            return data.filter(filter.id === id)[0]
        });
    }

    /**
     * @async
     * Mise à jour
     * @param {String} storage
     * @param {String} id
     * @param {JSON} data
     */
    updateAsync(storage, id, data) {
        return this.deleteAsync(storage, id)
            .then(() => this.getAllAsync(storage))
            .then(items => {
                items.push(data);
                this.setStorageAsync(storage, items);
                return items;
            })
    }

    /**
     * @async
     * Overwrite toute la storage
     * @param {String} storage
     * @param {Array} dataArray
     */
    setStorageAsync(storage, dataArray) {
        return this.asyncLocalStorage.setItem(storage, dataArray);
    }

    /**
     * @async
     * Supprime un document
     * @param {String} storage
     * @param {String} id
     */
    deleteAsync(storage, id) {
        return this.getAllAsync(storage)
            .then(items => {
                const newItems = items.filter(item => item.id !== id);
                this.setStorageAsync(storage, newItems);
                return newItems;
            })
    }

    /**
     * @async
     * supprime la storage
     * @param {String} storage
     */
    deleteStorageAsync(storage) {
        return this.asyncLocalStorage.removeItem(storage);
    }
}
