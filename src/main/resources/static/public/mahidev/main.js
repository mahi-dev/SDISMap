import {SETTINGS} from "./config/configuration.js";
import {RestWebClient} from "./service/RestWebClient.js";
import {SdisApiClient} from "./service/SdisApiClient.js";
import {Header} from "./ui/header/header.js";
import {SdisMap} from "./ui/Map/SdisMap.js";
import {SidePanel} from "./ui/SidePanel/SidePanel.js";

class Main {

    constructor() {
        this._sdisApiClient = new SdisApiClient(new RestWebClient(), SETTINGS.baseApiUrl, SETTINGS.sdisApi);
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
        this.createSidePannel();
    }

    async createMap() {
        const count = await this._sdisApiClient.countSdis();

        if (!count || count <= 0)
            this._sdisData = await this._sdisApiClient.importSdis();
        else
            this._sdisData = await this._sdisApiClient.getAllSdis();

        const initLatitude = this._sdisData?.center?.latitude;
        const initLongitude = this._sdisData?.center?.longitude;
        this._sdisMap = new SdisMap({
            initLatitude, initLongitude
        });
        this._sdisMap.attach(document.querySelector('.principal'));
        this._sdisMap.sdisData = this._sdisData;
        this._sdisMap.initMap();
        this._sdisMap.initSdisMarker(this._sdisData.sdisList);
    }

    createSidePannel() {

        const switchButton = {name: 'recherche dans le corps du texte', active: true, visible: true};
        const informationIcon = {
            tooltips: `Recherche uniquement dans l'objet, le nom du compte, le nom du fichier`,
            icon: 'fa fa-info-circle', visible: !switchButton.active
        };

        this._sidePanel = new SidePanel({
            switchButton, informationIcon,
            customFilters: {},
            prestationFilters: [],
            dateFilters: [],
            formatFilters: []
        });
        this._sidePanel.attach(document.querySelector('.principal'));
        this._sidePanel.closeButtonVisible = false;

    }
}

new Main();