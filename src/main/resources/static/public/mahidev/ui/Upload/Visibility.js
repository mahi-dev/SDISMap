'use strict';
/**
 * Class de gestion de la visibilité des élements d'upload
 */
export class Visibility{

    constructor(parentElement, fileUploadCollection, element, visibility, dropDownValues, metadata, label){
        this.fileUploadCollection = fileUploadCollection;
        this.element = element;
        this.visibility = visibility;
        this.parent = parentElement;
        this.dropDownValues = dropDownValues;
        this.gedMetadata = metadata;
        this.label = label;
        this.visibilityHandler();
    }

    static IGNORING = ['Type'];

    /** Crée un event pour conditionner la visiblité des élement d'upload */
    visibilityHandler(){

        if(this.visibility.bydefault === 'HIDDEN')
            this.element.classList.add('hidden');

        let element = this._getConditionElement();

        let operator = this.visibility.condition.operator;

        let values = this._getValues();

        const condition = (e) =>{
            let value = e.target.options[e.target.selectedIndex].value;

            let displayCondition = values.some((current) => {
                if (value === this.visibility.condition.element)
                    return false;
                else if(current === 'null' && operator === 'EQUAL')
                    return value === null;
                else if(current === 'null' && operator === 'NOT_EQUAL')
                    return value !== null;
                else if(current !== 'null' && operator === 'EQUAL')
                    return current === value;
                else if(current !== 'null' && operator === 'NOT_EQUAL')
                    return current !== value;
            });

            if(displayCondition){
                this.element.classList.remove('hidden');
                this.fileUploadCollection().updateRequireMetadata(this.gedMetadata, this.label, true);
            } else {
                this.element.classList.add('hidden');
                this.fileUploadCollection().updateRequireMetadata(this.gedMetadata, this.label, false);
            }

            let ignoreCondition = Visibility.IGNORING.some(current => current === this.label);

            if(!ignoreCondition && this.dropDownValues !== 'ignore' && this.dropDownValues.options.length < 2) { 
                this.element.classList.add('hidden');
                this.fileUploadCollection().updateRequireMetadata(this.gedMetadata, this.label, false);
            }

        }
        element.addEventListener('change',condition.bind(this));
        
    }

    /**
     * parse les valeurs
     * @returns {Array} contenant les valeurs 
     */
    _getValues(){
        let value = this.visibility.condition.value;
        let split = value.split('||');
        return _isNotEmpty(split) ? split : [value];
    }

    /**
     * recupere l'element html qui va conditionner la visiblité des élement d'upload
     * @returns {HTMLElement} l'element html 
     */
    _getConditionElement(){
        return this.parent.childNodes.item(this.visibility.condition.element);
    }
}
