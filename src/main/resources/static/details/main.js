import {SETTINGS} from "../public/mahidev/config/configuration.js";
import {RestWebClient} from "../public/mahidev/service/RestWebClient.js";
import {SdisApiClient} from "../public/mahidev/service/SdisApiClient.js";
import {Header} from "../public/mahidev/ui/header/header.js";
import {SdisPage} from "../public/mahidev/ui/Map/SdisPage.js";

class Main {

    constructor() {
        this.init();
    }

    get principalElement() {
        return document.querySelector('.principal');
    }

    async init() {
        this.createHeader();
        this._sdisApiClient = new SdisApiClient(new RestWebClient(), SETTINGS.baseApiUrl, SETTINGS.sdisApi);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const latitude = urlParams.get('latitude');
        const longitude = urlParams.get('longitude');
        const search = urlParams.get('search');
        if (search && search.length > 0)
            this._sdisData = await this._sdisApiClient.findFilteredSdis(search, {latitude, longitude});
        else
            this._sdisData = await this._sdisApiClient.filterSdisByLocation(latitude, longitude);
        const page = new SdisPage({sdis: this._sdisData?.sdisList});
        page.attach(this.principalElement);
    }

    createHeader() {
        const header = new Header();
        header.attach(document.querySelector('.header_principal'), {
            prepend: true
        });
        header.name = 'SDIS 84';
        header.logo = '../../../public/resources/img/sdis84.jpeg';
    }
}

new Main();
