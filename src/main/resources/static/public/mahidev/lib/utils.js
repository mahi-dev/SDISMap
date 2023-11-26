/**
 * polyfill permettant de tester l'egalité entre deux objets
 * @param {Object} a 
 * @param {Object} b 
 */
function isEquivalent(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

/** Verifie la presence d'un element
 * @param {any} value 
 * @return {Boolean} true si la value est present
 */
const isPresent = (value) => {
    return (value !== '') && (value !== undefined) && (value !== null);
};

/** function permettant de vérifier si une valeur est null ou undefined
 *  @param {any} value une chaine de caractere
 *  @return {Boolean} true si null ou undefined
 */
function _isNullOrUndefined(value) {
    return typeof value === 'undefined' || value === undefined || value === null;
}

/** function permettant de vérifier si une valeur est non null et non undefined
 *  @param {any} value une chaine de caractere
 *  @return {Boolean} true si non null et non undefined
 */
function _isNotNullOrUndefined(value) {
    return !_isNullOrUndefined(value);
}

function _isEmpty(object) {
    if (_isNullOrUndefined(object)) return true;
    else return Object.keys(object).length === 0;
}

function _isNotEmpty(object) {
    return !_isEmpty(object);
}

/** Retourne true si la personne connecté est le propietaire du fichier cliqué*/
function isDocOwner(connectedUser, docInfos) {
    return connectedUser.username == docInfos.metadatas.checkinUser || connectedUser.email == docInfos.metadatas.checkinUser;
}

/** Afficher ou cacher un element du Dom */
function afficher(element) {
    element.style.visibility = 'visible';
    element.style.height = 'auto';
    element.style.padding = '.25rem 1.5rem';
}

function cacher(element) {
    element.style.visibility = 'hidden';
    element.style.height = '0';
    element.style.padding = '0 0';
}

/** recuperation de l'extension d'un fichier depuis le chemin ou le nom
 * @param {String} path le chemin du fichier ou le nom du fichier
 */
function get_extension(path) {
    var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
        // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf('.'); // get last position of `.`

    if (basename === '' || pos < 1) // if file name is empty or ...
        return ""; //  `.` not found (-1) or comes first (0)

    return basename.slice(pos + 1); // extract extension ignoring `.`
}

function isPDF(docInfos) {
    return get_extension(docInfos.fileName) === 'pdf';
}

function get_name_sans_extension(name) {
    return name.split('.')[0];
}

/**
 * Ajout des noms des documents sélectionnés à la cible
 * @param {Array} selectedDocuments La liste des documents sélectionnés
 * @param {HTMLElement} target L'élement cible
 */
function addDocsName(selectedDocuments, target) {
    selectedDocuments.forEach((doc, index, array) => {
        let docname = document.createElement('p');
        docname.setAttribute('class', 'modalDocsName')
        docname.textContent = doc.fileInformations.filename;
        target.appendChild(docname);
    });
}

/**
 * Excute le callback si le document est prêt
 * @param {Function} callback la fonction à exceuter
 */
function readyDom(callback) {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

/**
 * Verifie que la chaine passé est un JsonString
 * @param {String} value la chaine de caractères à verifier
 * @returns {Boolean} retourn true si il s'agit d'un JsonString
 */
function isJsonString(value) {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

/**ForEachAsychrone */
function forEachAsync(arr, fn) {
    function next() {
        var el = arr.shift();
        if (el) {
            return Promise.resolve(fn(el)).then(next);
        }
    }
    return Promise.resolve().then(next);
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

function forEachUploadAsync(arr) {
    function next() {
        var el = arr.shift();
        if (el) {
            let map = el.map(fileUpload => fileUpload.uploadCurrentAsync())
            return Promise.all(map).then(next);
        }
    }
    return Promise.resolve().then(next);
}

/** generation UUID*/
function createUUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function isString(value) {
    typeof value === 'string';
}

function isJson(value) {
    typeof value === 'object';
}

function isNumberString(value) {
    return isString(value) && !isNaN(value);
}

/** Envoie d'un message à Marco via Iframe */
function sendToMarco(message, stringify = true) {
    let messageToMarco = stringify ? JSON.stringify(message) : message;
    window.parent.postMessage(messageToMarco, '*');
}

function extend(target) {
    let sources = [].slice.call(arguments, 1);
    sources.forEach(source => {
        for (let prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

function _isNotEmptyProperties(json) {
    if (_isNotEmpty(json)) {
        for (const [key, value] of Object.entries(json)) {
            if (value.length) return true;
        }
    }
    return false;
}

function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0,
        length = array.length;
    while (i < length) {
        result.push(Array.prototype.slice.call(array, i, i += count));
    }
    return result;
}

function getOneDayAgo() {
    return new Date(Date.now() - 86400000).toISOString();
}

function getOneWeekAgo() {
    return new Date(Date.now() - 604800000).toISOString();
}

function getOneMonthAgo() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth()-1, now.getDate()).toISOString();
}

function getOneYearAgo() {
    return new Date(Date.now() - 31536000000).toISOString();
}

function toISOString(value) {
    return new Date(value).toISOString();
}