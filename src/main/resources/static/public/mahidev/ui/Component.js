export class Component {

    static counter = 0;

    constructor(options = undefined) {
        this._initProperties(options || {});
        this.listeners = {}
    }

    set _wrapId(value) {
        this.wrapId = this._generateId(value);
    }

    // permet de composer les composants existants (this.dom est accessible)
    initComponents() {
    }

    // permet d’attacher des événements pour le fonctionnement interne au composant
    bindEvents() {
    }

    // permet d’éviter les leaks en détachant les événements
    unbindEvents() {
    }

    // méthode à définir dans les classes de base pour définir le HTML du composant
    toHtml() {
        throw new Error('Not implemented yet.');
    }

    // méthode publique qui sert à attacher le composant au DOM
    attach(parent, options) {
        this.dom = this._createDom(this.toHtml());
        this.initComponents();
        this.bindEvents()

        if (options?.replace)
            parent.replaceChild(this.dom, parent.firstElementChild)
        else if (options?.prepend)
            parent.prepend(this.dom);
        else
            parent.appendChild(this.dom);
    }

    setVisible(element, value) {
        if (element?.classList)
            element.classList[value ? 'remove' : 'add']('hidden');
    }

    _initProperties(options) {
        for (const [key, value] of Object.entries(options)) {
            if (!this._hasSetter(this, key))
                throw new Error('Invalid property ' + key + ' for component ' + this.constructor.name + '.');
            this[key] = value;
        }
    }

    _hasSetter(obj, name) {
        if (obj.constructor === Object)
            return false;
        let desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, name);
        return (desc && !!desc['set']) || this._hasSetter(Object.getPrototypeOf(obj), name);
    }

    _createDom(html) {
        let parsingNode = document.createElement('div');
        parsingNode.innerHTML = html;
        return parsingNode.firstElementChild;
    }

    // méthode publique qui sert à détacher le composant du DOM
    detach() {
        this.unbindEvents();
        this.dom.parentNode.remove();
    }

    addEventListener(eventType, listener) {
        if (_isNullOrUndefined(this.listeners[eventType]))
            this.listeners[eventType] = []
        this.listeners[eventType].push(listener);
    }

    removeEventListener() {
    }

    clearEventListeners(eventType) {
        delete this.listeners[eventType];
    }

    fireEvent(event) {
        for (let listener in this.listeners[event.type]) {
            this.listeners[event.type][listener](event);
        }
    }

    _generateId(prefix) {
        return (prefix || 'c') + '_' + ++Component.counter;
    }

    addClass(value) {
        this.dom.classList.add(value);
    }

    removeClass(value) {
        this.dom.classList.remove(value);
    }
}
