
class Autocomplete 
{
    constructor(o)
    {        
        document.querySelector('form').autocomplete = 'off';
        
        if(typeof o.element === 'undefined') {
            alert('Autocomplete foi instanciado incorretamente'); return false;
        }        
        
        this._input = o.element;
        this._nomeInput = o.element.name;
        this._inputHidden;
        this._oLista;
        this._dataList;
        this._elementList;
        this._inputAutocompleteAll = document.getElementsByClassName('autocompletar');
        this._li;
        this._sizeList;
        this._ponteiro = 0;        
        this._limit = (o.limit)? o.limit : 5;        
        this._callback = (typeof o.callback === 'function') ? o.callback : null;
        
        this.inicializar();
    }
    
    inicializar()
    {        
        this.validaPreRequisitos();
        this.carregaOptionsList();
        this.construcao();
        this.addOuvinteKeyUp();
        this.addOuvinteDBClick();
        this.addOuvinteClickItem();
        this.addOuvinteClickOutput();
        //this.addOuvinteFocus();
    }
    
    validaPreRequisitos()
    {
        if(!this._input.classList.contains('autocompletar')){
            alert(`AUTOCOMPLETE (Falha) - Adicione no input ${this._nomeInput} a class="autocompletar"`); return false;
        }
        else if(!this._input.dataset.list){
            alert(`AUTOCOMPLETE (Falha) - É necessário criar um data-list no input ${this._nomeInput}`); return false;
        }else{
            this._dataList = this._input.dataset.list;        
        }
        
        if(!document.getElementById(this._dataList)){
            alert(`AUTOCOMPLETE (Falha) - O ID da lista não confere com o data-list="${this._dataList}" do input`); return false;
        }
        
        this._elementList = document.getElementById(this._dataList);
        
        this._input.name = `${this._nomeInput}_autocomplete`;
    }
    
    carregaOptionsList()
    {
        let lista = this._elementList.children;
        let data = new Array();
        
        let select = `<select class="hidden" name="${this._nomeInput}">`;
            
        for(let i = 0; i < this._elementList.childElementCount; i++){
            data[i] = {id: lista[i].dataset.value, name: lista[i].textContent};
            select += `<option value="${lista[i].dataset.value}">${lista[i].textContent}</option>`;
        }
        
        select += `</select>`;
        
        this._input.insertAdjacentHTML('beforebegin', select); 
        
        this._inputHidden = document.getElementsByName(this._nomeInput)[0];
        
        this._oLista =  data;
    }
    
    setItemList(value)
    {
        this._inputHidden.value = value;
        if(value){
            this._input.value = this._inputHidden.selectedOptions[0].innerHTML;
        }else {
            this._input.value = '';
        }
    }
    
    getItemList()
    {
        return this._inputHidden.value;
    }
    
    getItemText()
    {
        return this._inputHidden.selectedOptions[0].innerHTML;
    }
    
    
    construcao()
    {        
        this._input.placeholder = 'SELECIONE UM ITEM...';        
        
        this._inputHidden.addEventListener('change', (event)=>{
            alert('entrou');
        });
        
        this._elementList.hidden = true;
    }
    
    
    /**addOuvinteFocus()
    {        
        this._input.addEventListener("focus", (event) => {
            if(!event.target.value){
                this.hiddenElementListAll();
                this.iniciaAutocomplete();
                this.addOuvinteClickItem();
            }
        });
    }*/
    
    
    
    addOuvinteKeyUp()
    {        
        document.addEventListener("keypress", (event) => {
            
            if(event.keyCode === 9){ //Tecla TAB
                this._ponteiro = 0;
                this.hiddenElementListAll(event);
            }
        });
        
        this._input.addEventListener("keypress", (event) => {
            
            if(event.target.readOnly){
                return false;
            }
            
            if(event.keyCode === 13){ //Tecla ENTER
                event.preventDefault();
                
                if(this._li){
                    for (let i = 0; i < this._li.length; i++) {
                        if(this._li[i].classList.contains('active')){
                            this.selecionaItem(this._li[i]);
                            return false;
                        }
                    }
                }
            }
            
            if(event.keyCode !== 9){
                this._inputHidden.value = '';
                this.iniciaAutocomplete();
                this.addOuvinteClickItem();
                this._elementList.hidden = false;
            }
            
            if(event.keyCode === 40){ //Seta para BAIXO
                
                event.preventDefault();
                
                this._li   = event.target.parentNode.children[2].children;
                this._sizeList = (event.target.parentNode.children[2].children.length);
                
                if(this._ponteiro === this._sizeList){
                    this._ponteiro = 0;   
                }
                
                
                if(this._ponteiro === 0){
                    this._li[this._ponteiro].classList.add('active');                    
                }
                else if(this._ponteiro > 0 && this._ponteiro < this._sizeList){
                    this._li[this._ponteiro].previousSibling.classList.remove('active');
                    this._li[this._ponteiro].classList.add('active');
                }
                
                if(this._sizeList > 1 && this._ponteiro <= this._sizeList){
                    this._ponteiro++;   
                }
                                
                
            }
            
            else if(event.keyCode === 38){ //Seta para CIMA
                event.preventDefault();
                
                this._li   = event.target.parentNode.children[2].children;
                this._sizeList = (event.target.parentNode.children[2].children.length);
                
                if(this._ponteiro > 0){
                    this._ponteiro--;
                }

                if(this._ponteiro === 0){
                    this._li[this._ponteiro].classList.remove('active');
                    this._ponteiro = this._sizeList;  
                }
                else if(this._ponteiro > 0 && this._ponteiro < this._sizeList){
                    this._li[this._ponteiro].classList.remove('active');                    
                    this._li[this._ponteiro].previousSibling.classList.add('active');
                }
                
                if(this._ponteiro === this._sizeList){
                    this._li[this._ponteiro-1].classList.add('active');                   
                }

                 
            }
            
            /*else if(event.keyCode !== 9){
                this._inputHidden.value = '';
                this.iniciaAutocomplete();
                this.addOuvinteClickItem();
                this._elementList.hidden = false;
            }*/
            
        });
    }
    
    addOuvinteDBClick()
    {        
        this._input.addEventListener("dblclick", (event) => {
            
            if(event.target.readOnly){
                return false;
            }
            
            this._inputHidden.value = '';
            this.iniciaAutocomplete();
            this.addOuvinteClickItem();
            this._elementList.hidden = false;
        });
    }
    
    
    
    iniciaAutocomplete()
    {
        let texto = this._input.value;

        let resposta = new Array();
        
        for(let i = 0; i < this._oLista.length; i++){            
            let stringDigitada = this.removerAcentos(texto).toUpperCase();
            let stringDaLista  = this.removerAcentos(this._oLista[i].name).toUpperCase();

            if(stringDaLista.indexOf(stringDigitada) != -1){
                resposta[i] = this._oLista[i].name;
                resposta[i] = '<li data-value="'+this._oLista[i].id+'">'+stringDaLista.replace(stringDigitada, '<span style="color: royalblue; font-weight: bold;">'+stringDigitada+'</span>')+'</li>';
            }
        }
        
        let filtro = new Array();
        resposta.map((res, i, arr) => filtro.push(arr[i]));
        
        let retorno = new Array();
        for (let i = 0; i < this._limit; i++) {
            retorno[i] = filtro[i];
        }

        this._elementList.innerHTML = retorno.join('');
    }
    
    
    addOuvinteClickItem() 
    {
        let items = document.querySelectorAll('#'+this._dataList+' li');
                
        for (var i = 0; i < items.length; i++) {            
            items[i].onclick = (item) => {
                this.selecionaItem(item.target);
            }
        }
    }
    
    
    selecionaItem(item)
    {           
        this._inputHidden.value = item.dataset.value;
        this._input.value = item.textContent;
        this._input.focus();
        this._elementList.hidden = true;
        
        if(this._callback){
            this._callback(item.dataset.value);
        }
    }
    
    
    
    hiddenElementListAll(event) {        
        let size = this._inputAutocompleteAll.length;
        let input;
        
        for (var i = 0; i < size; i++) {   
            input = this._inputAutocompleteAll[i].name.replace('_autocomplete', '');
            
            if(event.target.value && !document.getElementsByName(input)[0].value){
                this._inputAutocompleteAll[i].value = '';
            }
            
            document.getElementById(this._inputAutocompleteAll[i].dataset.list).hidden = true;
        }
    }
    
    addOuvinteClickOutput()
    {
        document.addEventListener('click', (event) => {
            
            if(!this._inputHidden.value){
                //Esse código abaixo cagava quando um input precisava popular outro inpu
                //document.getElementsByName(this._inputHidden.name+'_autocomplete')[0].value = ''
            }
            
            this._elementList.hidden = true;
        });
    }
    
       
    removerAcentos( newStringComAcento ) 
    {
        var string = newStringComAcento;
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