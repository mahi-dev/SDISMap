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
        if (search && search.length > 0) {
            // this._sdisData = await this._sdisApiClient.findFilteredSdis(search, {latitude, longitude});
            this._sdisCommon = await this._sdisApiClient.findFilteredCommonSdis(search, {latitude, longitude});
            this._sdisData = await this._sdisApiClient.findFilteredDetailsSdis(search, {latitude, longitude});
        } else {
            // this._sdisData = await this._sdisApiClient.filterSdisByLocation(latitude, longitude);
            this._sdisCommon = await this._sdisApiClient.filterSdisCommonByLocation(latitude, longitude);
            this._sdisData = await this._sdisApiClient.filterSdisDetailsByLocation(latitude, longitude);
        }

        if (this._sdisData.count === 0)
            this._redirect();
        const sdisCommon = this._sdisCommon;
        const sdisDetails = this._sdisData?.sdisList;
        const switchButtonName = 'Distinguer les duplications';
        const switchButtonActive = false;

        this._sdisPage = new SdisPage({sdisCommon, sdisDetails, switchButtonActive, switchButtonName});
        this._sdisPage.attach(this.principalElement);
        this._sdisPage.switchButtonVisible = true;
        this._sdisPage.switchButtonColorVisible = false;
        this._sdisPage.addEventListener('sortColumn',
            e => this._sortColumn(e.detail.siteLatitude, e.detail.siteLongitude, e.detail.sortBy, e.detail.element));
    }

    createHeader() {
        const header = new Header();
        header.attach(document.querySelector('.header_principal'), {
            prepend: true
        });
        const localImg = `../../../${SETTINGS.header.src}`;
        header.name = SETTINGS.header.title;
        header.logo = (SETTINGS.header.urlExterne?.length > 0) ? SETTINGS.header.urlExterne : localImg;
        header.logoWidth = SETTINGS.header.width;
        header.alt = SETTINGS.header.alternativeText;
        header.addEventListener('headerLogoClick', e => this._redirect(e));
        header.addEventListener('headerLogoError', e => header.logo = localImg);
    }

    _redirect(e) {
        window.location.href = "/";
    }

    async _sortColumn(siteLatitude, siteLongitude, sortBy, element) {

        const classStyle = 'red';
        const ascClicked = sortBy.indexOf('ASC') > 0;
        const asc = () => element.querySelector(".fa-sort-up");
        const desc = () => element.querySelector(".fa-sort-down");
        if ((ascClicked && asc().classList.contains(classStyle)) ||
            (!ascClicked && desc().classList.contains(classStyle))) return;

        const sortedData = await this._sdisApiClient.filterSdisDetailsByLocation(siteLatitude, siteLongitude, sortBy);
        this._sdisPage.sortColum = sortedData?.sdisList;

        document.querySelectorAll('[class^="fa-sort-"], [class*=" fa-sort-"]')
            .forEach(fas => fas.classList.remove(classStyle))
        asc().classList[ascClicked ? 'add' : 'remove'](classStyle);
        desc().classList[!ascClicked ? 'add' : 'remove'](classStyle);
    }

}

new Main();
