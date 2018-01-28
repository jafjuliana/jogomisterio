$(function() {

    var objArmas, armas, objCriminosos, criminosos, objLocais, locais;
    var arrayArmas = [];
    var arrayCriminosos = [];
    var arrayLocais = [];
    var arraySorteio = [];
    var userCriminoso, userLocal, userArma, resultado;
    var objMisterioId, objParse, idUser;
    $(".options").hide();
    $(".result").hide();
    $(".text-not").hide();

    //Listagem de armas, criminosos e locais
    $.when($.ajax("https://handson.eniwine.com.br/api/descubraoassassino/armas"), $.ajax("https://handson.eniwine.com.br/api/descubraoassassino/criminosos"),$.ajax("https://handson.eniwine.com.br/api/descubraoassassino/locais")).done(function(resultA, resultC, resultL) {
        objArmas = resultA[0];
        armas = JSON.parse(objArmas);
        objCriminosos = resultC[0];
        criminosos = JSON.parse(objCriminosos);
        objLocais = resultL[0];
        locais = JSON.parse(objLocais);

        for (var j = 0; j < criminosos.length; j++) {
            arrayCriminosos[j] = criminosos[j].Id;
            $(".criminosos .listagem").append("<li>" + criminosos[j].Id + " - " + criminosos[j].Nome + "</li>");
        } 
        
        for (var k = 0; k < locais.length; k++) {
            arrayLocais[k] = locais[k].Id;
            $(".locais .listagem").append("<li>" + locais[k].Id + " - " + locais[k].Nome + "</li>");
        } 

        for (var i = 0; i < armas.length; i++) {
            arrayArmas[i] = armas[i].Id;
            $(".armas .listagem").append("<li>" + armas[i].Id + " - " + armas[i].Nome + "</li>");
        } 

        arraySorteio[0] = Math.floor((Math.random() * criminosos.length) + 1);
        arraySorteio[1] = Math.floor((Math.random() * locais.length) + 1);
        arraySorteio[2] = Math.floor((Math.random() * armas.length) + 1);
    });

    //Inicio do jogo
    $(".play").on("click", function(e) {
        e.preventDefault();
        $(".options").show("slow");
    });

    //Resultado do jogo
    $(".finish").on("click", function(e, data) {
        e.preventDefault();
        userCriminoso = $('.criminoso').val();
        userLocal = $('.local').val();
        userArma = $('.arma').val();

        //Verificação das respostas
        if((userCriminoso == "" || userLocal == "" || userArma == "") && (userLocal == "" || userCriminoso == "" || userArma == "") && (userCriminoso == "" || userArma == "" || userLocal == "") && (userLocal == "" || userArma == "" || userCriminoso == "") && (userArma == "" || userLocal == "" || userCriminoso == "") && (userArma == "" || userCriminoso == "" || userLocal == "")){
            $(".text-not").show("slow");
        }else{
            $(".text-not").hide("slow");
            if(arraySorteio[0] != userCriminoso && arraySorteio[1] != userLocal && arraySorteio[2] != userArma){
                resultado = "Todos estão incorretos";
            }
            else if(arraySorteio[0] == userCriminoso && arraySorteio[1] == userLocal && arraySorteio[2] == userArma){
                resultado = "Todos corretos, você solucionou o caso!!";
            }
            else if(arraySorteio[0] == userCriminoso && arraySorteio[1] == userLocal && arraySorteio[2] != userArma){
                resultado = "O criminoso e local estão corretos"
            }
            else if(arraySorteio[0] == userCriminoso && arraySorteio[2] == userArma && arraySorteio[1] != userLocal){
                resultado = "O criminoso e arma estão corretos"
            }
            else if(arraySorteio[1] == userLocal && arraySorteio[2] == userArma && arraySorteio[0] != userCriminoso){
                resultado = "O local e arma estão corretos"
            }
            else if(arraySorteio[0] == userCriminoso && (arraySorteio[1] != userLocal && arraySorteio[2] != userArma)){
                resultado = "Somente o criminoso esta correto"
            }
            else if(arraySorteio[1] == userLocal && (arraySorteio[0] != userCriminoso && arraySorteio[2] != userArma)){
                resultado = "Somente o local esta correto"
            }
            else{
                resultado = "Somente a arma esta correta"
            }

            //Resultado na tela
            $('.text-result').text(resultado);
            $(".result").show("slow");

            //Envio da API
            $.ajax({type: 'GET', url: "https://handson.eniwine.com.br/api/descubraoassassino/", async: false, success: function(resultId){
                objMisterioId = resultId;
                objParse = jQuery.parseJSON(objMisterioId);
                idUser = objParse.misterioId;
            }});

            $.ajax({
                type: 'POST',
                url: "https://handson.eniwine.com.br/api/descubraoassassino/",
                data: {
                    IdSuspeito: "userCriminoso",
                    IdArma: "userArma",
                    IdLocal: "userLocal",
                    IdMisterio: "idUser",
                },
                success: function(resultData) { console.log("Enviado") }
            });

            //console.log(idUser);
        }
    });

    //console.log(arraySorteio);
    

});