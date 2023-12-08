import {FILTER} from "../../config/message.js";

export class SdisPopup {

    constructor(sdis, size) {
        this._sdis = sdis;
        this._value = `Afficher les details dans un nouvel onglet.`;
        this._size = size;
    }

    get _contextualSearchValue() {
        return document?.querySelector('.contextualsearch input')?.value;
    }

    toHtml() {
        const {
            name, mainUser, anfrNumber, commissioningDate, inseeSite, cadastreReference, supportNumber,
            supportDescription, supportColors, supportMarking, supportNature, supportOwner, location,
            aerien, emissionReception, frequency
        } = this._sdis;

        let href = `/details?latitude=${encodeURI(location?.siteLatitude)}&longitude=${encodeURI(location?.siteLongitude)}`;
        href += (this._contextualSearchValue && this._contextualSearchValue.length > 0) ? `&search=${this._contextualSearchValue}` : '';

        return `
            <div>
                <div class="row">
                    <p class='sdis-popup__name'><b>${name}</b></p>
                    <p class='sdis-popup__anfr-number'>${FILTER['anfrNumber']} : <b>${anfrNumber}</b></p>
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
                </div>
                 <div class="row">
                    <p class='sdis-popup__size'><b>${this._size} antenne${this._size > 1 ? 's' : ''}</b></p>
                </div>
                <a type="button" class="btn btn-outline-primary" role="button" target="_blank" href="${href}">${this._value}</a>
            </div>
            `;
    }
}
