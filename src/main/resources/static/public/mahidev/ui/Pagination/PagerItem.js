import {
    Component
} from '../Component.js';
export class PagerItem extends Component {

    /**
     * @public
     * setter du numero de page à afficher dans le bouton du pager
     * @param {Number} value le numero de page
     */
    set pageNumber(value){
        this.dom.classList.add('page-number');
        this.page = value;
    }

    /**
     * @public
     * seeter du total de page
     * @param {Number} value le total à afficher
     */
    set totalPages(value){
        this.page = 'Total ' + value;
    }

    /**
     * @public
     * setter du boutton du pager
     * @param {any} value la valeur à afficher dans le bouton
     */
    set page(value){
        this.dom.querySelector('.page-link').textContent = value;
    }

    /**
     * @public
     * active/desactive le bouton du pager
     * met en surbrillance le boutton de la page active
     * @param {Boolean} value true met en surbrillance le bouton
     */
    set active(value){
        this.dom.classList[value ? 'add' : 'remove']('active');
    }

    /**
     * @public
     * active/desactive le bouton du pager
     * verouille le bouton du pager
     * @param {Boolean} value true rend le bouton inactif
     */
    set disable(value){
        this.dom.classList[value ? 'add' : 'remove']('disabled');
    }

    bindEvents() {
        this.dom.querySelector('.page-link').addEventListener('click', e => this.fireEvent(new CustomEvent('pageClick')));
    }

    toHtml(){
        return `<li class="page-item">
                    <a href='#' class="page-link"></a>
                </li>`
    }
}