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
        this._sdisController.createSidePanel(new SidePanel({sdisFilters: this._sdisFilters}));
        this._sdisController.crateDropArea();
    }

    createHeader() {
        const header = new Header();
        header.attach(document.getElementsByTagName('main')[0], {
            prepend: true
        });
        header.name = 'SDIS 84';
        header.logo = 'public/resources/img/sdis84.jpeg';
    }
}

new Main();
