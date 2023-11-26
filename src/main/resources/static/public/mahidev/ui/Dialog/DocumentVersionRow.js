import {Component} from "../Component.js";
export class DocumentVersionRow extends Component {

	set value(value) {
		this._value = value;
	}

    get versionCode(){
        return this._value._version.code;
    }

    get comment(){
        const comment = this._value._version.comment;
        return  (!comment || comment == 'null') ? '' : comment;
    }

	toHtml() {
		return `
			<div style="display: table-row;">
				<div style="display: table-cell;"></div>
				<div style="display: table-cell;">${this.versionCode}</div>
				<div style="display: table-cell;">${this.comment}</div>
				<div style="display: table-cell;"></div>
			</div>`;
	}

	initComponents() {
        let documentInfos = this._value._documentInfos;
        let version = this._value._version;

		let cells = this.dom.querySelectorAll('div div')

		let a = this.downloadLink(documentInfos, version);
        cells[0].appendChild(a);

        if (documentInfos.locked) {
            let restorelink = this.restoreLink(documentInfos, version);
            cells[3].appendChild(restorelink);
        }
	}

    downloadLink(docInfos, version) {
        var a = document.createElement('a');
        var link = document.createTextNode(version.fileInfos.filename);
        a.appendChild(link);
        a.title = version.fileInfos.filename;
        a.href = "#";
        a.addEventListener("click", ()=>{
            this.fireEvent(new CustomEvent('downloadVersion', {
                detail: {
                    documentId:  docInfos.metadataMap.documentId,
                    version : version.code,
                    fileName : version.fileInfos.filename
                }
            }));
        });
        return a;
    }

    restoreLink(docInfos, version) {
        var a = document.createElement('a');
        var link = document.createTextNode("restaurer");
        a.appendChild(link);
        a.title = version.fileInfos.filename;
        a.href = "#";
        a.addEventListener("click", ()=>{
            this.fireEvent(new CustomEvent('restoreVersion', {
                detail: {
                    documentId:  docInfos.metadataMap.documentId,
                    version : version.code
                }
            }));
        });
        return a;
    }
}