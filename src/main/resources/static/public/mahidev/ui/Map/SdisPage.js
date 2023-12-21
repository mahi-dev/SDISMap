import {FILTER} from "../../config/message.js";
import {Switch} from "../Button/Switch.js";
import {Component} from "../Component.js";
import {DataTable} from "../datatable/DataTable.js";

export class SdisPage extends Component {

    constructor(option) {
        super(option);
    }

    set sdis(value) {
        this._sdis = value;
    }

    set switchButtonVisible(value) {
        this._switchButton.visible = value;

    }

    set switchButtonColorVisible(value) {
        this._switchButtonColor.visible = value;

    }

    set switchButtonActive(value) {
        this._switchButtonActive = value;

    }

    set switchButtonName(value) {
        this._switchButtonName = value;
    }

    get switchButtonState() {
        return this._switchButton.state;
    }

    bindEvents() {
        const {location} = this._sdis[0];
        const {siteLongitude, siteLatitude} = location;
        this._switchButton.addEventListener('toggleEvent', this._distinctDuplicateValue.bind(this));
        this._switchButtonColor.addEventListener('toggleEvent', this._distinctColors.bind(this));
        this._dataTable.addEventListener('sortColumn', e => this.fireEvent(new CustomEvent('sortColumn', {
            detail: {siteLongitude, siteLatitude, sortBy: e.detail.sortBy, element: e.detail.element}
        })));
    }

    initComponents() {
        this._switchButtonColor = new Switch({name: 'Grouper les duplications', default: false});
        this._switchButtonColor.attach(this.dom.querySelector('#distinctColor'));

        this._switchButton = new Switch({name: this._switchButtonName, default: this._switchButtonActive});
        this._switchButton.attach(this.dom.querySelector('#distinctDuplicate'));

        const headers = ['aerienNumber', 'aerienType', 'emissionReceptionPower', 'aerienDimension', 'aerienHeight', 'aerienAzimuth',
            'FrequencyBandMin', 'FrequencyBandMax', 'FrequencyBandService'];
        const rows = this._sdis.map(sdis => {
            const {aerien, frequency, emissionReception} = sdis;
            return [aerien.number, aerien.type, emissionReception.power, aerien.dimension, aerien.height,
                aerien.azimuth, frequency.bandMin, frequency.bandMax, frequency.bandService];
        });
        const distinctDuplicate = this.switchButtonState;
        this._dataTable = new DataTable({headers, rows, distinctDuplicate});
        this._dataTable.attach(this.dom.querySelector(".sdis-page__antenna_details__table"))
    }

    _distinctDuplicateValue(value) {
        this._dataTable.distinctDuplicate = value.detail;
        this._dataTable.createDataTable();
        this._switchButtonColor.visible = value.detail;
        if (!value.detail) {
            if (this._switchButtonColor.state) {
                this._switchButtonColor.dom.querySelector('input').click();
            }
            this._distinctColors({detail: false})
        }
    }

    _distinctColors(value) {
        this._dataTable.distinctColor = value.detail;
        this._dataTable.createDataTable();
    }

    toHtml() {
        const {name, anfrNumber, supportNumber, supportColors, supportNature, supportOwner, location} = this._sdis[0];
        const {address, postalCode, municipality, siteLongitude, siteLatitude} = location;
        return `
            <div class="sdis-page__antenna_details">
                <div class="sdis-page__antenna_details__common">
                    <div class="row">
                        <p class='sdis-page__antenna_details__name'><b>${name}</b></p>
                        <p class='sdis-page__antenna_details__anfr-number'>${FILTER['anfrNumber']} : <b>${anfrNumber}</b></p>
                    </div>
                    <div class="row sdis-page__antenna_details__distinct">
                        <div class="switchButton" id="distinctColor"></div>
                        <div class="switchButton" id="distinctDuplicate"></div>
                    </div>
                    <div class="row">
                        <p class='sdis-page__antenna_details__location'>${address}, ${postalCode} ${municipality}</p>
                        <p class='sdis-page__antenna_details__gps'>GPS - Long : <i>${siteLongitude}</i>  Lat : <i>${siteLatitude}</i></p>
                    </div>    
                    <div class="row">
                        <p class='sdis-page__antenna_details__support-number'>${FILTER['supportNumber']} : ${supportNumber}</p>
                        <p class='sdis-page__antenna_details__support-colors'>${FILTER['supportColors']} : ${supportColors}</p>
                        <p class='sdis-page__antenna_details__support-nature'>${FILTER['supportNature']} : ${supportNature}</p>
                        <p class='sdis-page__antenna_details__support-owner' >${FILTER['supportOwner']} : ${supportOwner}</p>
                    </div>
                </div>
                <div class="sdis-page__antenna_details__table"></div>
            </div>`;
    }
}
