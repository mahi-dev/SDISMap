import {SETTINGS} from "./config/configuration.js";
import {SdisController} from "./controller/SdisController.js";
import {RestWebClient} from "./service/RestWebClient.js";
import {SdisApiClient} from "./service/SdisApiClient.js";
import {Header} from "./ui/header/header.js";
import {SdisMap} from "./ui/Map/SdisMap.js";
import {SidePanel} from "./ui/SidePanel/SidePanel.js";

class Main {

    constructor() {
        this._sdisController = new SdisController(new SdisApiClient(new RestWebClient(), SETTINGS.baseApiUrl, SETTINGS.sdisApi), new SdisMap(), new SidePanel());
        this.init();
    }

    createHeader() {
        const header = new Header();
        header.attach(document.getElementsByTagName('main')[0], {
            prepend: true
        });
        header.name = 'SDIS 84';
        header.logo = 'public/resources/img/sdis84.jpeg';

    }

    async init() {
        this.createHeader();
        await this.createMap();
        await this.createSidePannel();
    }

    async createMap() {
        const count = await this._sdisController.countAsync();

        if (!count || count <= 0)
            this._sdisData = await this._sdisController.importAsync();
        else
            this._sdisData = await this._sdisController.getAllAsync();

        this._sdisController.createMap(this._sdisData);
    }

    async createSidePannel() {
        await this._sdisController.createSidePannel();
    }
}

new Main();
