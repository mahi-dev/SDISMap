export class SdisPopup {
    constructor(sdis) {
        this._sdis = sdis;
    }

    toHtml() {
        const {
            name, mainUser, anfrNumber, commissioningDate, inseeSite, cadastreReference, supportNumber,
            supportDescription, supportColors, supportMarking, supportNature, supportOwner, location,
            aerien, emissionReception, frequency
        } = this._sdis;

        return `
        <div>
            <p><b>${name}</b></p>
            <p>${location.address}</p>
            <p>${location.postalCode} ${location.municipality} </p>
            <p>ANFR Number: ${anfrNumber}</p>
            <p>INSEE Site: ${inseeSite}</p>

            <p>Aerien - Number: ${aerien.number}</p>
            <p>Aerien - Type: ${aerien.type}</p>
            <p>Aerien - Dimension: ${aerien.dimension}</p>
            <p>Aerien - Tilt: ${aerien.tilt}</p>
            <p>Aerien - Height: ${aerien.height}</p>
            <p>Frequence Min: ${frequency.bandMin} - Max: ${frequency.bandMax}</p>
            <p>Band Service: ${frequency.bandService}</p>
        </div>
        `;
    }
}