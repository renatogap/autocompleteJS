# Autocomplete
Autocomplete com Javascript Nativo.

## Uso

1.importar o arquivo js:
```html
<script type="text/javascript" src="js/autocomplete-js.js"></script>
```

2.importar os arquivos css 'autocomplete-js.css' e 'bootstrap.min.css':
```html
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/autocomplete-js.css" rel="stylesheet" type="text/css">
```

3.Montar normalmente o combobox no HTML:
```html
<div class="form-group row">
  <label for="frutas" class="col-sm-2 col-form-label">Pessoa 1</label>
  <div class="col-sm-10">
      <select name="pessoa1" id="pessoa1" class="form-control autojs" 
          data-min="2">
          <option value="1">The Godfather</option>
          <option value="2">The Wizard of Oz</option>
          <option value="3">Citizen Kane</option>
          <option value="4">The Shawshank Redemption</option>
          <option value="5">Pulp Fiction</option>
          <option value="6">Casablanca</option>
          <option value="7">The Godfather: Part II</option>
          <option value="8">E.T. The Extra-Terrestrial</option>
          <option value="9">2001: A Space Odyssey</option>
          <option value="10">Schindler's List</option>
          <option value="11">Star Wars</option>
          <option value="12">Back to the Future</option>
          <option value="13">Raiders of the Lost Ark</option>
          <option value="14">Forrest Gump</option>
          <option value="15">Gone With the Wind</option>
      </select>
  </div>
</div>
```
