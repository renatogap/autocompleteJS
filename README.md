# Plugin AutocompleteJS
AutocompleteJS é um plugin feito apenas com javascript puro. Não requer o uso da bilioteca jQuery, basta importar no seu projeto para começar a brincar.

##Uso


1. Importa o arquivo js
```html
<script type="text/javascript" src="js/autocomplete-js.js"></script>
```

2. Importa os arquivos css 'autocomplete-js.css' e 'bootstrap.min.css'
```html
<link href="css/autocomplete-js.css" rel="stylesheet" type="text/css">
```

3. Cria no HTML o combobox
```html
<div class="form-group row">
  <label for="frutas" class="col-sm-2 col-form-label">UF</label>
  <div class="col-sm-10">
      <select name="uf" id="uf">
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>
  </div>
</div>
```

4. Instancia a classe no javascript passando o 'id' como parmâmetro
```javascript
<script type="text/javascript">       
  obj = new AutocompleteJS('uf');
</script>
```

5. Pronto, agora é só fazer bom proveito do autocomplete

---

### Criando o combo via Javascript

1. Cria no HTML o combobox ***vazio***
```html
<div class="form-group row">
  <label for="frutas" class="col-sm-2 col-form-label">UF</label>
  <div class="col-sm-10">
      <select name="uf" id="uf">        
      </select>
  </div>
</div>


2. Instancia a classe 
```javascript
<script type="text/javascript">       
  obj = new AutocompleteJS('uf');
  ...
```  

3. Invoca o método "**setOptions()**" passando nos parâmetros um array de objetos
```javascript
<script type="text/javascript">       
  obj.setOptions([
      {id: "AC", name: "Acre"},
      {id: "AL", name: "Alagoas"},
      {id: "AP", name: "Amapá"},
      {id: "AM", name: "Amazonas"},
      {id: "BA", name: "Bahia"},
      {id: "CE", name: "Ceará"},
      {id: "DF", name: "Distrito Federal"},
      {id: "ES", name: "Espírito Santo"},
      {id: "GO", name: "Goiás"},
      {id: "MA", name: "Maranhão"},
      {id: "MT", name: "Mato Grosso"},
      {id: "MS", name: "Mato Grosso do Sul"},
      {id: "MG", name: "Minas Gerais"},
      {id: "PA", name: "Pará"},
      {id: "PB", name: "Paraíba"},
      {id: "PR", name: "Paraná"},
      {id: "PE", name: "Pernambuco"},
      {id: "PI", name: "Piauí"},
      {id: "RJ", name: "Rio de Janeiro"},
      {id: "RN", name: "Rio Grande do Norte"},
      {id: "RS", name: "Rio Grande do Sul"},
      {id: "RO", name: "Rondônia"},
      {id: "RR", name: "Roraima"},
      {id: "SC", name: "Santa Catarina"},
      {id: "SP", name: "São Paulo"},
      {id: "SE", name: "Sergipe"},
      {id: "TO", name: "Tocantins"}
  ]);
</script>
```

---

## Obter e setar um valor no combo via javascript

Pegando o valor selecionado no combo
```javascript
obj.getValue();
```

Setando o valor no combo. Será selecionado automaticamente o item com o valor informado
```javascript
obj.setValue('PA');
```
