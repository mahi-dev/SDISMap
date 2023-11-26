const SORTING_KEY = 'sorting';

export class Preferences {
    
    /**
     *  Charger le cookie de préférence de tri
     */
    static loadCookie() {
        const cookieString = document.cookie;
        let cookies = [];
        if (cookieString !== '' && cookieString !== null && cookieString !== undefined) {
            cookies = cookieString.split(';');
        }
        let sortingCookie = '';
        for (let v of cookies) {
            if (v.trim().startsWith('sorting')) {
                sortingCookie = JSON.parse(v.split('=')[1]);
            }
        }

        return sortingCookie;
    }

    /**
     * Enregistre le cookie - création et update
     * @param {string} type le type de tri (Trier par)
     * @param {string} order l'ordre croissant/décroissant
     */
    static storeCookie(type, order) {
        const value = {
            sortingType: type,
            sortingOrder: order
        }
        document.cookie = SORTING_KEY + '=' + JSON.stringify(value) + ';expires=' + Preferences.getExpirationDate() + ';path=/';
    }

    /**
     * Date d'expiration du cookie 1 an
     */
    static getExpirationDate() {
        const d = new Date();
        d.setTime(d.getTime() + (3600 * 24 * 365) * 1000);
        return d;
    }
}
