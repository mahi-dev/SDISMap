import {Component} from "../Component.js";
import {FILTER} from "../../config/message.js";
import {DataTable} from "../datatable/DataTable.js";

export class SdisPage extends Component {

    constructor(option) {
        super(option);
    }

    set sdis(value) {
        this._sdis = value;
    }

    initComponents() {
        const headers = [FILTER['aerienNumber'], FILTER['type'], FILTER['dimension'], FILTER['tilt'], FILTER['height'],
            FILTER['bandMin'], FILTER['bandMax'], FILTER['bandService']];

        const rows = this._sdis.map(sdis => {
            const {aerien, frequency} = sdis;
            return [aerien.number, aerien.type, aerien.dimension, aerien.tilt, aerien.height, frequency.bandMin,
                frequency.bandMax, frequency.bandService];
        });

        const dataTable = new DataTable({headers, rows});
        dataTable.attach(this.dom.querySelector(".sdis-page__antenna_details__table"))
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
