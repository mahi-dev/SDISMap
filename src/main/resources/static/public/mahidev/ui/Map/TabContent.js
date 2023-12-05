import {Component} from "../Component.js";
import {FILTER} from "../../config/message.js";

export class TabContent extends Component {

    constructor(option) {
        super(option);
    }

    set index(value) {
        this._index = value;
    }

    set sdis(value) {
        this._sdis = value;
    }
    
    toHtml() {
        const {
            name, mainUser, anfrNumber, commissioningDate, inseeSite, cadastreReference, supportNumber,
            supportDescription, supportColors, supportMarking, supportNature, supportOwner, location,
            aerien, emissionReception, frequency
        } = this._sdis;
        return `
            <div id="tab${this._index}" class="tabcontent">
                <p><b>${name}</b></p>
                <p>${location.address}</p>
                <p>${location.postalCode} ${location.municipality} </p>
                <p>${FILTER['anfrNumber']} : ${anfrNumber}</p>
                <p>${FILTER['inseeSite']} : ${inseeSite}</p>
                <p>${FILTER['aerienNumber']} : ${aerien.number}</p>
                <p>${FILTER['type']} : ${aerien.type}</p>
                <p>${FILTER['dimension']} : ${aerien.dimension}</p>
                <p>${FILTER['tilt']} : ${aerien.tilt}</p>
                <p>${FILTER['height']} : ${aerien.height}</p>
                <p>${FILTER['bandMin']} : ${frequency.bandMin} - ${FILTER['bandMax']} : ${frequency.bandMax}</p>
                <p>${FILTER['bandService']} : ${frequency.bandService}</p>
            </div>`;
    }
}
