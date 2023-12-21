import {SETTINGS} from "./config/configuration.js";
import {SdisController} from "./controller/SdisController.js";
import {RestWebClient} from "./service/RestWebClient.js";
import {SdisApiClient} from "./service/SdisApiClient.js";
import {Header} from "./ui/header/header.js";
import {SdisMap} from "./ui/Map/SdisMap.js";
import {SidePanel} from "./ui/SidePanel/SidePanel.js";

class Main {

    constructor() {
        this.init();
    }

    async initData() {
        const count = await this._sdisController.countAsync();

        if (!count || count <= 0)
            this._sdisData = await this._sdisController.importAsync();
        else
            this._sdisData = await this._sdisController.getAllAsync();

        this._sdisFilters = await this._sdisController.getFilters();
    }

    async init() {
        this.createHeader();
        this._sdisController = new SdisController(
            new SdisApiClient(new RestWebClient(), SETTINGS.baseApiUrl, SETTINGS.sdisApi), new SdisMap());
        await this.initData();
        this._sdisController.createMap(this._sdisData);
        const size = this._sdisData.count;
        this._sdisController.createSidePanel(new SidePanel({
            sdisFilters: this._sdisFilters,
            textValue: `${size} antenne${size > 1 ? 's' : ''}`
        }));
        this._sdisController.createDropArea();
        this._sdisController.createSpinner();
    }

    createHeader() {
        const header = new Header();
        header.attach(document.querySelector('.header_principal'), {
            prepend: true
        });
        header.name = SETTINGS.header.title;
        header.logo = (SETTINGS.header.urlExterne?.length > 0) ? SETTINGS.header.urlExterne : SETTINGS.header.src;
        header.logoWidth = SETTINGS.header.width;
        header.alt = SETTINGS.header.alternativeText;
        header.addEventListener('headerLogoClick', e => this._redirect(e));
        header.addEventListener('headerLogoError', e => header.logo = SETTINGS.header.src);
    }

    _redirect(e) {
        window.location.href = "/";
    }
}

new Main();
