$(function() {

    var objArmas, armas, objCriminosos, criminosos, objLocais, locais, objMisterioId, misterioId, idUser;
    var arrayArmas = [];
    var arrayCriminosos = [];
    var arrayLocais = [];
    var arraySorteio = [];
    var userCriminoso, userLocal, userArma, resultado;
    $(".options").hide();
    $(".result").hide();

    //Listagem de armas, criminosos e locais
    $.when($.ajax("https://handson.eniwine.com.br/api/descubraoassassino/armas"), $.ajax("https://handson.eniwine.com.br/api/descubraoassassino/criminosos"),$.ajax("https://handson.eniwine.com.br/api/descubraoassassino/locais"), $.ajax("https://handson.eniwine.com.br/api/descubraoassassino/")).done(function(resultA, resultC, resultL, resultId) {
        objArmas = resultA[0];
        armas = JSON.parse(objArmas);
        objCriminosos = resultC[0];
        criminosos = JSON.parse(objCriminosos);
        objLocais = resultL[0];
        locais = JSON.parse(objLocais);
        objMisterioId = resultId[0];
        misterioId = JSON.parse(objMisterioId);
        idUser = misterioId.misterioId;

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

    $(".play").on("click", function(e) {
        e.preventDefault();
        $(".options").show("slow");
    });

    $(".finish").on("click", function(e, data) {
        e.preventDefault();
        userCriminoso = $('.criminoso').val();
        userLocal = $('.local').val();
        userArma = $('.arma').val();

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

        $('.text-result').text(resultado);
        $(".result").show("slow");
    });

    console.log(arraySorteio);

});