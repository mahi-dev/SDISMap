import {Component} from "../Component.js";
import {FILTER} from "../../config/message.js";
import {DataTable} from "../Dialog/DataTable.js";
import {DocumentRow} from "../datatable/DocumentRow.js";

export class SdisPage extends Component {

    constructor(option) {
        super(option);
    }

    set sdis(value) {
        this._sdis = value;
    }

    toHtml() {
        const {
            name, anfrNumber, supportNumber, supportColors, supportNature,
            supportOwner, location
        } = this._sdis[0];

        const common = `
            <div class="row">
                <p class='sdis-page__name'><b>${name}</b></p>
                <p class='sdis-page__anfr-number'>${FILTER['anfrNumber']} : ${anfrNumber}</p>
            </div>
            <div class="row">
                <p class='sdis-page__location'>${location.address} ${location.postalCode} ${location.municipality} </p>
                <p class='sdis-page__gps'>GPS - Long : ${location.siteLongitude}  Lat: ${location.siteLatitude} </p>
            </div>    
            <div class="row">
                <p class='sdis-page__support-number'>${FILTER['supportNumber']} : ${supportNumber}</p>
                <p class='sdis-page__support-colors'>${FILTER['supportColors']} : ${supportColors}</p>
                <p class='sdis-page__support-nature'>${FILTER['supportNature']} : ${supportNature}</p>
                <p class='sdis-page__support-owner'  >${FILTER['supportOwner']} : ${supportOwner} </p>
            </div>`;

        let headings = [FILTER['aerienNumber'], FILTER['type'], FILTER['dimension'], FILTER['tilt'], FILTER['height'],
            FILTER['bandMin'], FILTER['bandMax'], FILTER['bandService']];

        const items = this._sdis.map(sdis => {
            const {aerien, frequency} = sdis;
            return [aerien.number, aerien.type, aerien.dimension, aerien.tilt, aerien.height, frequency.bandMin, frequency.bandMax, frequency.bandService];
        });

        let rowBuilder = item => new DocumentRow({value: item});
        let dataTable = new DataTable({headings, items, rowBuilder});


        // const specific = this._sdis.map((sdis, index) => {
        //     const {aerien, frequency} = sdis;
        //
        //     return `<p>${FILTER['aerienNumber']} : ${aerien.number}</p>
        //             <p>${FILTER['type']} : ${aerien.type}</p>
        //             <p>${FILTER['dimension']} : ${aerien.dimension}</p>
        //             <p>${FILTER['tilt']} : ${aerien.tilt}</p>
        //             <p>${FILTER['height']} : ${aerien.height}</p>
        //             <p>${FILTER['bandMin']} : ${frequency.bandMin} - ${FILTER['bandMax']} : ${frequency.bandMax}</p>
        //             <p>${FILTER['bandService']} : ${frequency.bandService}</p>`;
        // });

        return `<div>
                    ${common}
                    ${dataTable.toHtml()}
                </div>`;
    }
}
