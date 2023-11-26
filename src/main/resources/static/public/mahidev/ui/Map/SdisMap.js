import {Component} from "../Component.js";
import {SdisPopup} from "./SdisPopup.js";

export class SdisMap extends Component {

    constructor(options) {
        super(options);
        this.wrapId = this._generateId('sdis_map');
        this._sdisInfos = [];
    }

    set initZoom(value) {
        this._zoom = value;
    }

    set initLatitude(value) {
        this._latitude = this.convertToDecimal(value);
    }

    set initLongitude(value) {
        this._longitude = this.convertToDecimal(value);
    }

    set sdisData(value) {
        this._sdisData = value;
    }

    get currentMap() {
        if (this._map)
            return this._map;
        return L.map('map');
    }

    set currentMap(value) {
        this._map = value;
    }


    /****************************/
    filter(filtering) {
        this.sdisData = this._sdisData.filter(filtering);
        this.currentMap.remove();
        this.initComponents();
    }

    centerMap(latitude, longitude, zoom = 10) {
        this.currentMap = this.currentMap.setView([latitude, longitude], zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.currentMap);
    }

    fitBound(sdisList) {
        const sdisPoints = sdisList.map(sdis => sdis.location).map(location => {
            return {
                latitude: this.convertToDecimal(location.siteLatitude),
                longitude: this.convertToDecimal(location.siteLongitude)
            };
        }).map(point => {
            return [point.latitude, point.longitude];
        });
        const myBounds = new L.LatLngBounds(sdisPoints);
        this.currentMap = this.currentMap.fitBounds(myBounds);
    }

    addMarker(sdis, latitude, longitude) {
        const convertedLatitude = this.convertToDecimal(latitude);
        const convertedLongitude = this.convertToDecimal(longitude);
        const marker = L.marker([convertedLatitude, convertedLongitude]).addTo(this._map);
        const sdisInfo = {sdis, marker};
        this._sdisInfos.push(sdisInfo);
        return sdisInfo;
    }

    removeMarker(sdisInfo) {
        sdisInfo.marker.remove();
    }

    addPopup(sdisInfo, htmLContent) {
        const popup = sdisInfo.marker.bindPopup(htmLContent);
        sdisInfo.popup = popup;
        return popup;
    }

    createHtmlContent(sdis) {
        return new SdisPopup(sdis).toHtml();
    }

    initComponents() {

    }

    initMap() {
        if (this._latitude && this._longitude) {
            this.centerMap(this._latitude, this._longitude, this._zoom);
        }
        this.fitBound(this._sdisData?.sdisList)
    }

    initSdisMarker(sdisList) {
        sdisList.map(sdis => this.addMarker(sdis, sdis.location.siteLatitude, sdis.location.siteLongitude))
            .map(sdisInfo => this.addPopup(sdisInfo, this.createHtmlContent(sdisInfo.sdis)))
    }

    toHtml() {
        return `<div id="map"></div>`;
    }

    convertToDecimal(dms) {
        if (!dms) {
            throw new Error("Format de DMS invalide");
        }

        const parts = dms.trim().split(/[°'"\s]+/);
        if (parts.length < 3) {
            throw new Error("Format de DMS invalide : " + dms);
        }

        const degrees = parseFloat(parts[0]);
        const minutes = parseFloat(parts[1]);
        const seconds = parseFloat(parts[2]);

        let decimal = degrees + (minutes / 60) + (seconds / 3600);

        if (dms.includes("S") || dms.includes("W")) {
            decimal = -decimal;
        }

        return decimal;
    }


    findFurthestPoints(points) {
        if (points?.length < 2 && !points.every(point => point.hasOwnProperty('latitude')
            && point.hasOwnProperty('latitude'))) return {};
        const calculateCentre = (point1, point2) => {
            const lat1 = point1.latitude * Math.PI / 180;
            const lon1 = point1.longitude * Math.PI / 180;
            const lat2 = point2.latitude * Math.PI / 180;
            const lon2 = point2.longitude * Math.PI / 180;

            const bx = Math.cos(lat2) * Math.cos(lon2 - lon1);
            const by = Math.cos(lat2) * Math.sin(lon2 - lon1);
            const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
                Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + by * by));
            const lon3 = lon1 + Math.atan2(by, Math.cos(lat1) + bx);

            return {
                latitude: lat3 * 180 / Math.PI,
                longitude: lon3 * 180 / Math.PI
            };
        }
        const haversineDistance = (coords1, coords2) => {
            const toRad = (x) => {
                return x * Math.PI / 180;
            }

            const lon1 = coords1[1];
            const lat1 = coords1[0];

            const lon2 = coords2[1];
            const lat2 = coords2[0];

            const R = 6371; // Rayon de la Terre en km
            const x1 = lat2 - lat1;
            const dLat = toRad(x1);
            const x2 = lon2 - lon1;
            const dLon = toRad(x2);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;

            return d;
        }

        let maxDistance = 0;
        let furthestPair = [];
        let centre;

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                let distance = haversineDistance(
                    [points[i].latitude, points[i].longitude],
                    [points[j].latitude, points[j].longitude]
                );
                if (distance > maxDistance) {
                    maxDistance = distance;
                    furthestPair = [points[i], points[j]];
                }
            }
        }

        if (furthestPair.length > 0) {
            centre = calculateCentre(furthestPair[0], furthestPair[1]);
        }

        return {
            distance: maxDistance,
            points: furthestPair,
            centre
        };
    }

}