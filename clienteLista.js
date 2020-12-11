// JavaScript source code
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {

    client.subscribe('resultado-lista-imovel', function (err) {
        if (!err) {
            console.clear()
            console.log("Consulta Imovel");

            client.publish('lista-imovel', "");
            //client.publish('registra-imovel', JSON.stringify(imovel));
            //client.end();
        }
    });
});

client.on('message', function (topic, message) {
    if (topic === "resultado-lista-imovel") {
        const lista = JSON.parse(message.toString());

        console.log(lista);
        client.end();
    }
});