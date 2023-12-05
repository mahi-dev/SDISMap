import {FILTER} from "../../config/message.js";

export class SdisPopupTab {

    constructor(sdis) {
        this._sdis = sdis;
        this._href = `/location?latitude=${encodeURI(this._sdis[0].location?.siteLatitude)}&longitude=${encodeURI(this._sdis[0].location?.siteLongitude)}`;
        this._value = `Afficher les details dans un nouvel onglet.`;
    }

    set sdis(value) {
        this._sdis.push(value);
    }

    _openTab = (evt, tabName) => {
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    toHtml() {
        let tabsContent = '';
        let tabsHeader = '';

        // Génération des onglets et de leur contenu
        this._sdis.forEach((sdis, index) => {
            const {name, location, anfrNumber, inseeSite, aerien, frequency} = sdis;

            // Création des en-têtes des onglets
            tabsHeader += `<button class="tablinks" onclick="this._openTab(event, 'tab${index}')">${index}</button>`;

            // Création du contenu des onglets
            tabsContent += `
            <div id="tab${index}" class="tabcontent">
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
                <a type="button" class="btn btn-outline-primary" role="button" target="_blank" href="${this._href}">${this._value}</a>
            </div>
            `;
        });

        // Construction HTML avec les onglets
        return `
        <div class="tab">
            ${tabsHeader}
        </div>
        ${tabsContent}
        `;
    }
}
