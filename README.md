# Plugin AutocompleteJS
AutocompleteJS é um plugin feito apenas com javascript puro. Não requer o uso da bilioteca jQuery, basta importar no seu projeto para começar a brincar.

### Demo

- [Exemplo 1](https://renatogap.github.io/autocompleteJS/exemplo/exemplo1.html)
- [Exemplo 2](https://renatogap.github.io/autocompleteJS/exemplo/exemplo2.html)


---


## Uso


1. Importa o arquivo js e css
```html
<link href="css/AutocompleteJs.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/AutocompleteJs.js"></script>
```

2. Cria no HTML o combobox
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

3. Instancia a classe no javascript passando o 'id' como parmâmetro
```javascript
<script type="text/javascript">       
  let obj = new AutocompleteJS('uf');

```

---

### Criando o combo via Javascript

1. Cria no HTML o combo ***vazio***
```html

<select name="uf" id="uf">
</select>

```

2. Instancia a classe e invoca o método "**setOptions()**" passando nos parâmetros um array de objetos com os indices "id" e "name":
```javascript
<script type="text/javascript">      

  let obj = new AutocompleteJS('uf');
  
  obj.setOptions([
      {id: "AC", name: "Acre"},
      {id: "AL", name: "Alagoas"},
      {id: "AP", name: "Amapá"},
      {id: "AM", name: "Amazonas"},
      {id: "BA", name: "Bahia"},
      {id: "CE", name: "Ceará"},
      {id: "DF", name: "Distrito Federal"},
      
      ...
      
  ]);

```

---

## Obter e setar um valor no autocompleteJS via javascript

Pegando o valor selecionado no combo
```javascript
obj.getValue();
```

Setando o valor no combo via javascript. Será selecionado automaticamente o item com o valor informado
```javascript
obj.setValue('PA');
```
ou

Setando o valor na propriedade "**data-value**" no próprio combo do HTML:

```html

<select name="uf" id="uf" data-set="{SETA_AQUI_O_VALOR}"></select>

```
