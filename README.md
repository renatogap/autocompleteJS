# Autocomplete
Autocomplete com Javascript Nativo.

## Uso

1.Importar o arquivo js:
```html
<script type="text/javascript" src="js/autocomplete-js.js"></script>
```

2. Importar os arquivos css 'autocomplete-js.css' e 'bootstrap.min.css':
```html
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/autocomplete-js.css" rel="stylesheet" type="text/css">
```

3. Montar normalmente o combobox no HTML:
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

4. Instancia a classe no javascript:
```javascript
<script type="text/javascript">       
  obj = new AutocompleteJS('uf');
</script>
```


