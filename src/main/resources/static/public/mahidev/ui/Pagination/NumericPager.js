import {Component} from '../Component.js';
import {PagerItem} from './PagerItem.js'

export default class NumericPager extends Component {

    static PREVIOUS_BTN = 'Précédent';
    static NEXT_BTN = 'Suivant';
    static FIRST_PAGE_BTN = '<<';
    static LAST_PAGE_BTN = '>>';

    /**
     * @public
     * getter du nombre maximum de documents à renvoyer par page
     * @return {Number} le nombre maximum de documents à renvoyer par page
     */
    get pageSize(){
        return this._dataSource.pageSize;
    }

    /**
     * @public
     * getter du nombre maximum de page à afficher dans a pagination
     * @return {Number} le nombre maximum de page à afficher
     */
    get maxPage(){
        return this._maxPage;
    }

    set maxPage(value) {
        this._maxPage = value;
    }

    /**
     * @public
     * getter de la page courante
     * @return {Number} la page courante
     */
    get currentPage(){
        return this._dataSource.pageNumber;
    }

    /**
     * @public
     * calcul de la page de depart à afficher dans la pagination
     * @returns {Number} la page de depart
     */
    get startPage(){
        const median = Math.floor(this.maxPage  / 2);
        return (this.currentPage - median) > 0 ? this.currentPage - median : 1;
    }

    /**
     * @async
     * @public
     * calcul de la page de fin à afficher dans la pagination
     * @returns {Number} la page de fin
     */
    async getEndPage(){
        const totalPages = await this.getTotalPages();
        return ( this.startPage + (this.maxPage - 1)) <=
            totalPages ?
            ( this.startPage + (this.maxPage - 1)) :
            totalPages;
    }

    /**
     * @async
     * @public
     * @return true si il ya une page precedente
     */
     hasPreviousPage(){
        return this.currentPage > 1;
    }

    /**
     * @async
     * @public
     * @return true si il ya une page suivante
     */
    async hasNextPage(){
        const totalPages = await this.getTotalPages();
        return this.currentPage < totalPages;
    }

    /**
     * @async
     * @public
     * retourne le nombre total de documents
     * @returns {Number} le nombre total de documents
     */
    async getTotalItems(){
        return await this._dataSource.getItemCountAsync();
    }

    /**
     * @async
     * @public
     * retourne le nombre total de pages
     * @returns {Number} le nombre total de pages
     */
    async getTotalPages(){
        const totalItems = await this.getTotalItems();
        return Math.ceil( totalItems / this.pageSize);
    }

    /** retire la paginantion */
    removePagination() {
        this.dom.querySelector('#pagination').innerHTML = '';
    }

    async update(dataSource) {
		this._dataSource = dataSource;

        this.removePagination();
        let hasPreviousPage = this.hasPreviousPage();
        let hasNextPage = await this.hasNextPage();
        let totalPages = await this.getTotalPages();
        let startPage = this.startPage;
        let endPage = await this.getEndPage();
        if (startPage === endPage || totalPages === 0) return;

        this.firstPage = new PagerItem();
        this.firstPage.attach(this.dom.querySelector('#pagination'));
        this.firstPage.page = NumericPager.FIRST_PAGE_BTN;
        this.firstPage.disable = !hasPreviousPage;
        this.firstPage.addEventListener('pageClick', () => this.fireEvent(new CustomEvent('page', {
            detail: {
                page: NumericPager.FIRST_PAGE_BTN
            }
        })));

        this.previousPage = new PagerItem();
        this.previousPage.attach(this.dom.querySelector('#pagination'));
        this.previousPage.page =  NumericPager.PREVIOUS_BTN;
        this.previousPage.disable = !hasPreviousPage;
        this.previousPage.addEventListener('pageClick', () => this.fireEvent(new CustomEvent('page', {
            detail: {
                page:  NumericPager.PREVIOUS_BTN
            }
        })));

        for (let i = startPage; i <= endPage; i++) {
            let page = new PagerItem();
            page.attach(this.dom.querySelector('#pagination'));
            page.pageNumber = i;
            page.active = i===this.currentPage;
            page.addEventListener('pageClick', () => this.fireEvent(new CustomEvent('page', {
                detail: {
                    page: i
                }
            })));
        }

        this.nextPage = new PagerItem();
        this.nextPage.attach(this.dom.querySelector('#pagination'));
        this.nextPage.page =  NumericPager.NEXT_BTN;
        this.nextPage.disable = !hasNextPage;
        this.nextPage.addEventListener('pageClick', () => this.fireEvent(new CustomEvent('page', {
            detail: {
                page: NumericPager.NEXT_BTN
            }
        })));

        this.lastPage = new PagerItem();
        this.lastPage.attach(this.dom.querySelector('#pagination'));
        this.lastPage.page = NumericPager.LAST_PAGE_BTN;
        this.lastPage.disable = !hasNextPage;
        this.lastPage.addEventListener('pageClick', () => this.fireEvent(new CustomEvent('page', {
            detail: {
                page:  NumericPager.LAST_PAGE_BTN
            }
        })));

        this.totalPage = new PagerItem();
        this.totalPage.attach(this.dom.querySelector('.pagination'));
        this.totalPage.totalPages = totalPages;
    }


    toHtml() {
        return `
			<div class="row navigation">
				<nav class="mt-2 mw-auto">
            		<ul id="pagination" class="ml-3 pagination">
					</ul>
				</nav>
			</div>
		`;
    }

}