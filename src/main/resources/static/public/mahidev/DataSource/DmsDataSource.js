export default class DmsDataSource {

    /**
     * @public
     * Constructeur de la datasource
     * @param {Service} service le service à interroger pour recuperer les données
     */
    constructor(service) {
        this._service = service;
        this._cache = {};
    }

    /**
     * @public
     * getter de la page courante
     * @return {Number} la page courante
     */
    get pageNumber() {
        return this._pageNumber;
    }

    /**
     * @public
     * setter de la page courante
     * @param {Number} pageNumber la page courante
     */
    set pageNumber(pageNumber) {
        this._pageNumber = pageNumber;
    }

    /**
     * @public
     * getter du nombre maximum de sdis à renvoyer par page
     * @return {Number} le nombre maximum de sdis à renvoyer par page
     */
    get pageSize() {
        return this._pageSize;
    }

    /**
     * @public
     * setter du nombre maximum de sdis à renvoyer par page
     * @param {Number} pageSize le nombre maximum de sdis à renvoyer par page
     */
    set pageSize(pageSize) {
        this._pageSize = pageSize;
    }

    /**
     * @public
     * setter des filtres à appliquer
     * @param {DocumentInfos} filter le sdiss contenant les metadata de filtre
     */
    set filter(filter) {
        this._filter = filter;
    }

    /**
     * @public
     * setter permettant d'indiquer que les filtres ont changé
     * @param {Boolean} change true les filtres ont changé
     */
    set filterChanged(change) {
        this._filterChanged = change;
    }

    /**
     * @public
     * setter du critere de trie
     * @param {String} criteria le critère de trie
     */
    set sortingCriteria(criteria) {
        this._sortingCriteria = criteria;
    }

    /**
     * @public
     * setter de l'ordre de trie
     * @param {String} orderBy l'ordre de trie ASC ou DESC
     */
    set orderBy(orderBy) {
        this._orderBy = orderBy;
    }

    /**
     * @public
     * setter de l'ordre de trie
     * @param {JSON} order l'ordre de trie ASC ou DESC
     */
    set order(order) {
        this._order = order;
    }

    /** */
    set forceChange(value) {
        this._forceChange = value;
    }

    /**
     * @async
     * @public
     * retourne les données correspondant aux differents criteres de recherche
     * utilise le cache si les critères n'ont pas changé
     * @returns {Promise} les données
     */
    getDataAsync() {
        return new Promise((resolve, reject) => {
            if (this._hasChanged()) {
                const skipCount = (this._pageNumber - 1) * this._pageSize;
                this._service.executeAsync(this._filter, skipCount, this._pageSize, this._order)
                    .then(sdisList => sdisList.json())
                    .then(data => {
                        this._setCache(data);
                        resolve(data)
                    })

                    .catch(error => console.error('Erreur à la récupération de tous les sdis', error.message));
            } else resolve(this._cache.data)
        })
    }

    /**
     * @private
     * enregistre les données en cache
     * @param {Data} sdisList les données provenant du service
     */
    _setCache(sdisList) {
        this.forceChange = false;
        this._cache.pageNumber = this.pageNumber;
        this._cache.pageSize = this.pageSize;
        this.filterChanged = false;
        this._cache.sortingCriteria = this._sortingCriteria;
        this._cache.orderBy = this._orderBy;
        this._cache.order = this._order;
        this._cache.data = sdisList;
    }

    /**
     * @private
     * verifie si les critères ont changé
     * @return {Boolean} true si au moins un critère a changer
     */
    _hasChanged() {
        if (Object.keys(this._cache).length === 0) return true;
        if (this._cache.pageNumber !== this.pageNumber ||
            this._cache.pageSize !== this.pageSize ||
            this._filterChanged || this._forceChange ||
            this._cache.sortingCriteria !== this._sortingCriteria ||
            this._cache.orderBy !== this._orderBy) return true;

        return false;

    }

    /**
     * @async
     * @public
     * retourne le nombre total de sdis renvoyé par le service
     * @returns {Number} le nombre total de sdis
     */
    async getItemCountAsync() {
        const result = await this.getDataAsync();
        return result.count;
    }

    /**
     * @async
     * @public
     * retourne les sdis renvoyé par le service
     * @returns {Array} les sdis
     */
    async getItemsAsync() {
        const result = await this.getDataAsync();
        return result.data;
    }

}