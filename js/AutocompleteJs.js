class AutocompleteJS {

    constructor(e) {
        if(this._valida(e)) {
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
        this._eventClick(); //call event click        
        this._eventKey(); //call event key
        
        
    }
    
    _valida(e) {
        if(typeof e === 'undefined'){
            alert('Informe o parâmetro do autocomplete'); return false;
        }
        
        if(typeof e !== 'string'){
            alert("O parâmetro do autocomplete deve ser uma 'String'"); return false;
        }
        
        this._select = document.getElementById(e);

        if(!this._select){
            alert("O 'id' do elemento informado no parâmetro da classe está incorreto"); return false;
        }
        
        return true;
    }
    
    _setEmptyOption() {
        let option = document.createElement('option');
        option.value = "";
        option.setAttribute('selected', 'selected');
        option.appendChild(document.createTextNode('SELECIONE...'));
        this._select.appendChild(option);
    }
    
    _createInput() {
        if(typeof this._input !== 'undefined') this._input.remove();
        
        this._input = document.createElement('input');
        this._input.classList.add('form-control');
        this._input.placeholder = 'SELECIONE...';
        this._input.id = this._generateId();
        this._inputStyleInit();
        this._select.parentNode.appendChild(this._input);
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
                let li = document.createElement('li');
                li.dataset.value = options[i].value;
                li.appendChild(document.createTextNode(options[i].innerHTML.toUpperCase()));
                this._ul.appendChild(li);

                data[i] = {id: options[i].value, name: options[i].innerHTML.toUpperCase()};
            }
            
            this._caret = document.createElement('span');
            this._caret.classList.add('caret');
            
            this._caret.style.position = 'absolute';
            this._caret.style.top      = 'calc(50% - 1px)';
            this._caret.style.right    = '30px';
            this._caret.style.cursor   = 'pointer';
                    
                    
            this._input.parentNode.appendChild(this._caret);

            this._oLista =  data;
        }
    }

    setValue(value) {        
        this._select.value = value;
        this._input.value = this._ul.querySelector(`li[data-value="${value}"]`).textContent;
    }

    getValue() {
        return this._select.value;
    }

    
    setOptions(data) {
        if(typeof data !== 'object') {
            alert("O parâmetro informado no 'setOptions' não é um objeto"); return false;
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
                    alert("O parâmetro 'id' de um dos itens do método 'setOptions' está incorreto");
                    this._ul.innerHTML = '';
                    return false;
                }
                
                if(typeof data[i].name === 'undefined') {
                   alert(`No método 'setOptions' o item com id = '${data[i].id}' está com o parâmetro 'name' incorreto`);
                }

                let li = document.createElement('li');
                li.dataset.value = data[i].id;
                li.appendChild(document.createTextNode(data[i].name.toUpperCase()));
                this._ul.appendChild(li);
                
                let option = document.createElement('option');
                option.value = data[i].id;
                option.appendChild(document.createTextNode(data[i].name.toUpperCase()));
                this._select.appendChild(option);
                
                dataList[i] = {id: data[i].id, name: data[i].name.toUpperCase()};
            }

            this._oLista =  dataList;
        }else {
            alert("Informe o objeto no método 'setOptions'")
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
    
    
    _eventKey() {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                
                //find the li selected
                if(typeof e.target.nextSibling.children[this._point] !== 'undefined'){
                    let li = e.target.nextSibling.children[this._point];
                    this._selected(li);
                    this._hide();
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
        });
        
        document.addEventListener('keyup', (e) => {
                        
            if(e.target !== this._input){
                return false;
            }
            
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
                //this._input.value = this._li[this._point].textContent;
                
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
                    //this._input.value = this._li[this._point].textContent;
                    
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
                //delete this._point;
                //this._select.value = '';
                
                if(!this._input.value || this._input.value.length < this._min){
                    this._clean();
                    this._show();
                    this._input.focus();
                }
            }
            
            if(e.key === 'Delete') {
                //delete this._point;
                //this._select.value = '';
                
                if(!this._input.value || this._input.value.length < this._min){
                    this._clean();
                    this._show();
                    this._input.focus();
                }
            }
        });
    }
        
    
    _search() {        
        if(this._input.value && this._input.value.length >= this._min) {
            let newList        = new Array();
            let textoBusca     = this.removerAcentos(this._input.value).toLowerCase();
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

        searchList.forEach((e) => {            
            li[index] = `<li data-value="${e.id}">${e.name}</li>`;
            let palavra = e.name.split(' ');

            for(let j=0; j < palavra.length; j++) {
                let strPalavra  = this.removerAcentos(palavra[j]);

                stringDigitada.forEach((strBusca) => {
                    
                    //comparação lowercase
                    if(strPalavra.indexOf(strBusca) !== -1){
                        
                        let strBuscaUpperCase = strBusca.toUpperCase();
                        
                        //marcação com uppercase
                        li[index] = li[index].replace(strBuscaUpperCase, '<b>'+strBuscaUpperCase+'</b>');
                    }
                });
            }

            index++;
        });

        return li.join('');
    }
    
    _selected(li) {
        this._select.value = li.dataset.value;        
        this._input.value = li.textContent;
        this._input.focus();
        this._inputStyleOk();
        //this._select.options[this._select.options.selectedIndex].setAttribute('selected', 'selected')
        //this._hide();
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
        this._input.style.padding = '2px 30px 2px 10px';
        this._input.style.cursor = 'pointer';
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
        var mapaAcentosHex  = {
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