import {Component} from "../Component.js";

export default class DropArea extends Component {

    set visible(value) {
        this.dom.style.visibility = value ? "visible" : "hidden";
    }

    toHtml() {
        return `<div id="drop-area">
                <form class="my-form">
                    <div id="up-area">
                        <p id="glisser">Glissez-déposez des fichiers pour ajouter des points sur la carte, ou</p>
                        <label class="button" for="fileElem" id="parcourir">parcourir</label>
                        <progress id="progress-bar" max=100 value=0></progress>
                    </div>
                    <input type="file" id="fileElem" multiple accept=".xls,.xlsx">
                </form></div>`
    }

    reset() {
        document.getElementById("fileElem").value = '';
    }
}
