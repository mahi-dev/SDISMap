import {Component} from "../Component.js";
import {TabHeader} from "./TabHeader.js";
import {TabContent} from "./TabContent.js";

export class SdisPageTab extends Component {

    constructor(option) {
        super(option);
        this._sdis = [];
        this._headers = [];
        this._contents = [];
    }

    set sdis(value) {
        this._sdis.push(value);
    }

    initComponents() {
        this._sdis.forEach((sdis, index) => {
            const header = new TabHeader({index, name: index});
            header.attach(this.dom.querySelector('.tab'));
            this._headers.push(header);

            const content = new TabContent({sdis});
            content.attach(this.dom.querySelector('.tabsContent'));
            this._contents.push(content);
        })
    }

    bindEvents() {
        this._headers.forEach(header =>
            header.addEventListener('tabHeaderEvent', (e) => this._openTab(e.detail.event, e.detail.name))
        )

    }

    _openTab(evt, tabName) {
        let i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }


    toHtml() {
        return `<div class="tab"></div><div class="tabsContent"></div>`;
    }
}
