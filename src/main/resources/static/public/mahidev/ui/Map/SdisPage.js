import {Component} from "../Component.js";
import {FILTER} from "../../config/message.js";

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
                <p class='sdis-popup__name'><b>${name}</b></p>
                <p class='sdis-popup__anfr-number'>${FILTER['anfrNumber']} : ${anfrNumber}</p>
            </div>
            <div class="row">
                <p class='sdis-popup__location'>${location.address} ${location.postalCode} ${location.municipality} </p>
                <p class='sdis-popup__gps'>GPS - Long : ${location.siteLongitude}  Lat: ${location.siteLatitude} </p>
            </div>    
            <div class="row">
                <p class='sdis-popup__support-number'>${FILTER['supportNumber']} : ${supportNumber}</p>
                <p class='sdis-popup__support-colors'>${FILTER['supportColors']} : ${supportColors}</p>
                <p class='sdis-popup__support-nature'>${FILTER['supportNature']} : ${supportNature}</p>
                <p class='sdis-popup__support-owner'  >${FILTER['supportOwner']} : ${supportOwner} </p>
            </div>`;

        const specific = this._sdis.map((sdis, index) => {
            const {aerien, frequency} = sdis;

            return `<p>${FILTER['aerienNumber']} : ${aerien.number}</p>
                    <p>${FILTER['type']} : ${aerien.type}</p>
                    <p>${FILTER['dimension']} : ${aerien.dimension}</p>
                    <p>${FILTER['tilt']} : ${aerien.tilt}</p>
                    <p>${FILTER['height']} : ${aerien.height}</p>
                    <p>${FILTER['bandMin']} : ${frequency.bandMin} - ${FILTER['bandMax']} : ${frequency.bandMax}</p>
                    <p>${FILTER['bandService']} : ${frequency.bandService}</p>`;
        });

        return `<div>
                    ${common}
                    ${specific}
                </div>`;
    }
}
