// JavaScript source code
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

const imovel = {
    nome: "Imovel_",
    cidade: "Cidade_",
    classe: "Classe_",
    disponivel: "Disponivel",
}

client.on('connect', function () {

    client.subscribe('resultado-quantidade-imovel', function (err) {
        if (!err) {
            console.clear()
            client.publish('quantidade-imovel', "");
            
        }
    });
});

client.on('message', function (topic, message) {
    if (topic === "resultado-quantidade-imovel") {
        for (var key in imovel) {
            if (key == "nome") {
                cont = parseInt(message);;
                imovel[key] = "IMOVEL_" + cont.toString();
                //cont += 1;
            } else if (key == "cidade") {
                indiceCidade = Math.floor((Math.random() * 3) + 1);
                imovel[key] = "CIDADE_" + indiceCidade.toString();
            } else if (key == "classe") {
                indiceClasse = Math.floor((Math.random() * 3) + 1);
                imovel[key] = "CLASSE_" + indiceClasse.toString();
            }
        }
        console.log("Consulta Imovel");

        client.publish('cadastra-imovel', JSON.stringify(imovel));
        console.log(imovel);
        client.end();
        client.end();
    }
});