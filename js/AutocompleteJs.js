/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class AutocompleteJS {

    constructor(e, callback=null) {
        if(this._valida(e)) {
            
            this._callback = (typeof callback === 'function') ? callback : null;
            
            this._init();
        }
    }
    
        
    _init() {        
        this._min = 2;          
        
        if(typeof this._select.dataset.min !== 'undefined' && this._select.dataset.min){
            this._min = this._select.dataset.min;  
        }
        
        this._createInput(); //create input autocomplete        
        this._setEmptyOption(); //set option         
        this._hiddeSelect(); //Hidden select        
        this._loadList(); //Create list ul > li    
        this._setValueOnLoad();
        this._eventClick(); //call event click        
        this._eventKey(); //call event key
        
        this._interval;
    }

    _setValueOnLoad() {
        if(this._select.dataset.value) {
            this.setValue(this._select.dataset.value);
        }
    }
    
    _valida(e) {
        if(typeof e === 'undefined'){
            console.error('Informe o parâmetro do autocomplete'); return false;
        }
        
        if(typeof e !== 'string'){
            console.error("O parâmetro do autocomplete deve ser uma 'String'"); return false;
        }
        
        this._select = document.getElementById(e);

        if(!this._select){
            console.error("O 'id' do elemento informado no parâmetro da classe está incorreto"); return false;
        }
        
        return true;
    }
    
    _setEmptyOption() {
        let option = document.createElement('option');
        option.value = "";
        option.setAttribute('selected', 'selected');
        
        option.appendChild(document.createTextNode((this._select.dataset.ajax) ? 'DIGITE...' : 'SELECIONE...'));
        this._select.appendChild(option);
    }
    
    _createInput() {
        if(typeof this._input !== 'undefined') this._input.remove();
        
        this._input = document.createElement('input');
        this._input.classList.add('form-control');
        //this._input.classList.add('form-control-sm');
        this._input.placeholder = (this._select.dataset.ajax) ? 'DIGITE...' : 'SELECIONE...';
        this._input.autocomplete = 'off';
        this._input.id = this._generateId();
        this._inputStyleInit();
        this._select.parentNode.appendChild(this._input);

        if(this._select.classList.contains('form-control-sm')){
            this._input.classList.add('form-control-sm');
        }

        if(this._select.disabled) {
            this.setDisabled();
        }

        if(this._select.required) {
            this.setRequired();
        }
    }
    
    
    _loadList() {
        if(typeof this._loadByobject !== 'undefined'){
            this.setOptions(this._oLista);
            return false;
        }
        
        let options = this._select.children;
        
        if(options.length > 0) {
            let data = new Array();

            if(this._ul) {
                this._ul.innerHTML = '';
                this._ul.remove();
            }

            this._ul = document.createElement('ul');
            this._ul.id = this._generateId();
            this._ul.classList.add('autojs');
            this._ul.dataset.id = this._select.id;
            this._hide();
            this._select.parentNode.appendChild(this._ul);

            for(let i=0; i < options.length; i++){ 
                if(options[i].value) {
                    let li = document.createElement('li');
                    li.dataset.value = options[i].value;
                    li.appendChild(document.createTextNode(options[i].innerHTML.toUpperCase()));
                    this._ul.appendChild(li);

                    data[i] = {id: options[i].value, name: options[i].innerHTML.toUpperCase()};
                }
            }

            if(!this._select.dataset.nocaret) {
            
                this._caret = document.createElement('div');
                //Bootstrap 3
                //this._caret.classList.add('caret');
                //this._caret.style.top      = '1em';

                //Bootstrap 4
                this._caret.classList.add('dropdown-toggle');
                this._caret.style.top      = '0.5em';

                this._caret.style.position = 'absolute';
                this._caret.style.right    = '30px';
                this._caret.style.cursor   = 'pointer';
                        
                this._input.parentNode.appendChild(this._caret);
            }

            this._oLista =  data;
        }
    }

    setValue(value) {
        this._select.value = value;

        if(value!='') {
            this._input.value = this._ul.querySelector(`li[data-value="${value}"]`).textContent;
        }else {
            this._input.value = this._ul.querySelector(`li[data-value=""]`);
        }
    }

    getValue() {
        return this._select.value;
    }

    
    setOptions(data) {
        if(typeof data !== 'object') {
            this._oLista = []; return false;
            //console.error("O parâmetro informado no 'setOptions' não é um objeto."); return false;
        }
        
        if(data){
            this._loadByobject = true;
            
            if(this._ul) {
                this._ul.innerHTML = '';
                this._ul.remove();
            }
            
            this._ul = document.createElement('ul');
            this._ul.id = this._generateId();
            this._ul.classList.add('autojs');
            this._ul.dataset.id = this._select.id;
            this._hide();
            this._select.parentNode.appendChild(this._ul);
            
            let dataList = new Array();
            
            for (let i=0; i < data.length; i++){

                if(typeof data[i].id === 'undefined') {
                    console.error("O parâmetro 'id' de um dos itens do método 'setOptions' está incorreto");
                    this._ul.innerHTML = '';
                    return false;
                }
                
                if(typeof data[i].name === 'undefined') {
                   console.error(`No método 'setOptions' o item com id = '${data[i].id}' está com o parâmetro 'name' incorreto`);
                }

                let li = document.createElement('li');
                li.dataset.value = data[i].id;
                li.appendChild(document.createTextNode(data[i].name));
                this._ul.appendChild(li);
                
                let option = document.createElement('option');
                option.value = data[i].id;
                option.appendChild(document.createTextNode(data[i].name));
                this._select.appendChild(option);
                
                dataList[i] = {id: data[i].id, name: data[i].name};
            }

            this._oLista = dataList;
        }else {
            console.error("Informe o objeto no método 'setOptions'")
        }        
    }
    
    
    
    _eventClick() {
        window.addEventListener('click', (e) => {
            
            if(e.target == this._input){ //selected input
                this._search();
                this._show();
            }
            else if(e.target.parentNode == this._ul){ //selected item <li>
                this._selected(e.target);
                this._hide();
                
                if (this._callback) {
                    this._callback(this._select.value);
                }
            }
            else if(e.target.parentNode.parentNode == this._ul){
                this._selected(e.target.parentNode);
                this._hide();
                
                if (this._callback) {
                    this._callback(this._select.value);
                }
            }
            else {
                this._hide();
                
                if(!this._select.value){
                    this._input.value = '';
                    this._loadList();
                }
            }
        });
    }
    
    ajax() {
        Ajax.get(`${this._select.dataset.ajax}?q=${this._input.value}`, (resp) => {                
            Object.keys(resp).forEach(key => { resp[key].name = resp[key].nome; });
            this.setOptions(resp);
            this._show();
            this._search();
        });
    }
    
    _eventKey() {
        document.addEventListener('keydown', (e) => {
            if(e.target == this._input){
                if(e.key === 'Enter') {
                    e.preventDefault();

                    this._selected();
                    this._hide();
                    
                    if (this._callback) {
                        this._callback(this._select.value);
                    }
                }

                else if(e.key === 'Tab') {
                    if(e.target === this._input){
                        this._hide();

                        if(this._input.value && !this._select.value){
                            this._input.value = '';
                            delete this._point;
                            this._loadList();
                            this._inputStyleInit();
                        }
                    }
                }

                //Se a tecla pressionada for diferente dessas abaixo
                if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter' && e.key !== 'Tab') {

                    //verifica se o combo está configurado para chamar o ajax
                    if(this._select.dataset.ajax){
                        clearInterval(this._interval);
                        this._interval = setTimeout(() => { this.ajax(); }, 500);
                    }
                }
            }
        });
        
        document.addEventListener('keyup', (e) => {

            if(e.target == this._input){

                this._li = this._ul.children;
                this._size = this._ul.children.length;


                if(e.key === 'Escape') {
                    this._hide();
                }

                else if(e.key === 'ArrowDown') {
                    this._show();
                    this._search();

                    if(typeof this._point === 'undefined'){
                        this._point = 0;
                    }                
                    else if(this._point < this._size){                    
                        if(this._li[this._point+1]){                        
                            this._removePaint(this._li[this._point]);
                            this._point++;
                        }else {
                            return false;
                        }
                    }

                    this._paint(this._li[this._point]);

                    this._scrollFlow(this._ul, this._li[this._point]);
                }

                else if(e.key === 'ArrowUp') {
                    if(this._point === 0){
                        return false;
                    }                
                    else if(this._point > 0){
                        this._removePaint(this._li[this._point]);
                        this._point--;
                        this._paint(this._li[this._point]);
                        this._scrollFlow(this._ul, this._li[this._point]);
                    }
                }

                else if(e.key !== 'Tab' && e.key !== 'Enter') { //Qualquer Letra ou Backspace
                    delete this._point;
                    this._select.value = '';
                    this._inputStyleInit();

                    this._show();
                    this._search();
                }

                if(e.key === 'Backspace') {
                    if(!this._input.value || this._input.value.length < this._min){
                        this._clean();
                        this._show();
                        this._search();
                        this._input.focus();
                    }
                }

                if(e.key === 'Delete') {
                    if(!this._input.value || this._input.value.length < this._min){
                        this._clean();
                        this._show();
                        this._input.focus();
                    }
                }
                
            }
        });
    }
        
    
    _search() {        
        
        if(this._input.value && this._input.value.length >= this._min) {

            let valorTexto = (!this._select.value ? this._input.value: '');

            let newList        = new Array();
            let textoBusca     = this.removerAcentos(valorTexto).toLowerCase();
            let stringDigitada =  textoBusca.split(' ');
            let searchList     = this._oLista;
            

            for(let a = 0; a < stringDigitada.length; a++){
                newList = [];

                searchList.forEach((e) => {
                    let palavra = e.name.split(' ');

                    for(let j=0; j < palavra.length; j++) {                                
                        let stringDaLista  = this.removerAcentos(palavra[j]);

                        if(stringDaLista.indexOf(stringDigitada[a]) !== -1){
                            newList.push({id: e.id, name: e.name});                                    
                            return false;
                        }                                
                    };
                });

                searchList = newList;
            }
            
            this._ul.innerHTML = this._paintString(searchList, stringDigitada);
        }
    }
    
    
    _paintString(searchList, stringDigitada) {
        let li = new Array();
        let index = 0;

        searchList.forEach((itemList) => {
            let nameItem = this.removerAcentos(itemList.name);

            stringDigitada.forEach((strBusca) => {
                nameItem = nameItem.replace(strBusca, `<strong>${strBusca}</strong>`);
            });
            
            li[index] = `<li data-value="${itemList.id}">${nameItem.toUpperCase()}</li>`;

            index++;
        });

        return li.join('');
    }
    
    _selected(li=null) {
        this._select.value = (li) ? li.dataset.value : this._li[this._point].dataset.value;        
        this._input.value = (li) ? li.textContent : this._li[this._point].textContent;
        this._input.focus();
        this._inputStyleOk();
    }

    setDisabled() {
        this._input.disabled = true;
        this._input.style.cursor = 'auto';
    }

    setRequired() {
        this._input.setAttribute('required', true);
        this._input.style.cursor = 'auto';
    }
    
    setEnabled() {
        this._input.disabled = false;
        this._input.style.cursor = 'pointer';
    }

    setReadOnly() {
        this._input.readOnly = true;
        this._input.style.cursor = 'auto';
    }
    
        
    _clean() {
        this._input.value = '';
        this._loadList();
    }
    
    _show() {
        this._ul.style.display = 'block';
    }
    
    _hide() {
        this._ul.style.display = 'none';
    }
    
    _paint(e) {
        e.classList.add('active');
    }
    
    _removePaint(e) {
        e.classList.remove('active');
    }
        
    _hiddeSelect() {
        this._select.style.display = 'none';
    }
    
    _inputStyleInit() {
        //this._input.style.background = '#f2f2f2';
        this._input.style.cursor = 'pointer';
        this._input.style.paddingRight = '2em';
    }
    
    _inputStyleOk() {
        this._input.style.background = 'none';
    }
    
    _generateId() {
        return Math.floor(Math.random() * 99999999 + 1);
    }
    
    _scrollFlow(parent, child) {
        // Where is the parent on page
        let parentRect = parent.getBoundingClientRect();

        // What can you see?
        let parentViewableArea = {
            height: parent.clientHeight,
            width: parent.clientWidth
        };

        // Where is the child
        let childRect = child.getBoundingClientRect();
            // console.log(childRect);
        // Is the child viewable?
        let isViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height);

        // if you can't see the child try to scroll parent
        if (!isViewable) {


            // scroll by offset relative to parent
            //before scroll check if the bottom of child will be visible on next scroll
            if(parentRect.bottom - childRect.top < childRect.height) {
                parent.scrollTop = (childRect.bottom + parent.scrollTop) - parentRect.bottom;
                // child.scrollIntoView(false);
            } else {

                // parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top
                child.scrollIntoView();
            }


        }
    }
    
    removerAcentos( newStringComAcento ){
        var string = newStringComAcento.toLowerCase();
        var mapaAcentosHex 	= {
                a : /[\xE0-\xE6]/g,
                e : /[\xE8-\xEB]/g,
                i : /[\xEC-\xEF]/g,
                o : /[\xF2-\xF6]/g,
                u : /[\xF9-\xFC]/g,
                c : /\xE7/g,
                n : /\xF1/g
        };

        for ( var letra in mapaAcentosHex ) {
                var expressaoRegular = mapaAcentosHex[letra];
                string = string.replace( expressaoRegular, letra );
        }

        return string;
    }    
}
