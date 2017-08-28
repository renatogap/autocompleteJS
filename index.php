<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Autocomplete</title>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/Autocomplete.css">
    </head>
    <body>
        
        <div class="container">
            <div class="jumbotron">
              <h1>Autocomplete Javascript Native</h1>
              <p>Este Autocomplete foi criado sem nenhum comando jQuery, apenas com comandos de Javascript puro. 
                  Pré-requisitos: importar os arquivos Autocomplete.js e Autocomplete.css.</p>
            </div>
        </div>
        
        <div class="row">
            <form id="formulario">
                <div class="row">
                    <div class=" col-md-8 col-md-offset-3">
                        <div class="form-group">
                            <label class="col-md-1">Estado</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control autocompletar" id="estado" name="estado" data-list="listaEstado">
                                <ul id="listaEstado" style="background: #fff;">
                                    <li data-value="AC">Acre</li>
                                    <li data-value="AL">Alagoas</li>
                                    <li data-value="AM">Amapá</li>
                                    <li data-value="AP">Amazonas</li>
                                    <li data-value="BA">Bahia</li>
                                    <li data-value="CE">Ceará</li>
                                    <li data-value="DF">Distrito Federal (Brasília)</li>
                                    <li data-value="ES">Espírito</li>
                                    <li data-value="GO">Goiás</li>
                                    <li data-value="MA">Maranhão</li>
                                    <li data-value="MG">Mato Grosso</li>
                                    <li data-value="MS">Mato Grosso do Sul</li>
                                    <li data-value="MT">Minas</li>
                                    <li data-value="PA">Pará</li>
                                    <li data-value="PB">Paraíba</li>
                                    <li data-value="PE">Pernambuco</li>
                                    <li data-value="PI">Piauí</li>
                                    <li data-value="PR">Paraná</li>
                                    <li data-value="RJ">Rio</li>
                                    <li data-value="RN">Rio Grande do Norte</li>
                                    <li data-value="RO">Rondônia</li>
                                    <li data-value="RR">Rondônia</li>
                                    <li data-value="RS">Rio Grande do Sul</li>
                                    <li data-value="SC">Santa Catarina</li>
                                    <li data-value="SE">Sergipe</li>
                                    <li data-value="SP">São Paulo</li>
                                    <li data-value="TO">Tocantins</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>   
            </form>   
        </div>
        
                
        <script type="text/javascript" src="js/Autocomplete.js"></script>
        <script type="text/javascript">
            let estado = document.getElementById("estado");
            
            new Autocomplete({
                element: estado,
                limit: 8
            });
            
        </script>
    </body>
</html>

