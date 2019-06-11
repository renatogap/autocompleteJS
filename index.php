<!DOCTYPE html>
<html>
    <head>
        <title>AutocompleteJS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="css/AutocompleteJs.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="container">
            <form style="padding: 50px;" action="res.php" method="post">
                <div class="form-group row">
                    <label for="frutas" class="col-sm-12 col-form-label">UF</label>
                    <div class="col-sm-10">
                        <select name="uf" id="uf" data-min="2" data-limit="100">
                            <?php for($i=0; $i < 1000; $i++): ?>
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
                            <?php endfor; ?>
                        </select>
                    </div>
                  </div>
<!--                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label">UF via Javascript</label>
                    <div class="col-sm-10">
                        <select name="pessoa2" id="pessoa2" class="form-control autojs" data-min="2">                            
                        </select>
                    </div>
                </div>-->
                <div class="form-group row">
                    <div class="col-sm-10">
                        <input type="submit" class="btn btn-primary" value="Salvar">
                    </div>
                </div>                
            </form>
        </div>

        <script type="text/javascript" src="js/AutocompleteJs.js"></script>
        <script type="text/javascript">
            obj1 = new AutocompleteJS('uf');

            
//            obj2 = new AutocompleteJS('pessoa2');
//            obj2.setOptions([
//                  {id: "AC", name: "Acre"},
//                  {id: "AL", name: "Alagoas"},
//                  {id: "AP", name: "Amapá"},
//                  {id: "AM", name: "Amazonas"},
//                  {id: "BA", name: "Bahia"},
//                  {id: "CE", name: "Ceará"},
//                  {id: "DF", name: "Distrito Federal"},
//                  {id: "ES", name: "Espírito Santo"},
//                  {id: "GO", name: "Goiás"},
//                  {id: "MA", name: "Maranhão"},
//                  {id: "MT", name: "Mato Grosso"},
//                  {id: "MS", name: "Mato Grosso do Sul"},
//                  {id: "MG", name: "Minas Gerais"},
//                  {id: "PA", name: "Pará"},
//                  {id: "PB", name: "Paraíba"},
//                  {id: "PR", name: "Paraná"},
//                  {id: "PE", name: "Pernambuco"},
//                  {id: "PI", name: "Piauí"},
//                  {id: "RJ", name: "Rio de Janeiro"},
//                  {id: "RN", name: "Rio Grande do Norte"},
//                  {id: "RS", name: "Rio Grande do Sul"},
//                  {id: "RO", name: "Rondônia"},
//                  {id: "RR", name: "Roraima"},
//                  {id: "SC", name: "Santa Catarina"},
//                  {id: "SP", name: "São Paulo"},
//                  {id: "SE", name: "Sergipe"},
//                  {id: "TO", name: "Tocantins"}
//            ]);

        </script>
    </body>
</html>