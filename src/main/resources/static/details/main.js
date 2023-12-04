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
        const sdisId = urlParams.get('id');
        const sdis = await this._sdisApiClient.getSdis(sdisId);

        const page = new SdisPage({sdis});
        page.attach(this.principalElement);


    }

    createHeader() {
        const header = new Header();
        header.attach(document.getElementsByTagName('main')[0], {
            prepend: true
        });
        header.name = 'SDIS 84';
        header.logo = '../../../public/resources/img/sdis84.jpeg';
    }
}

new Main();
