// JavaScript source code
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {

    client.subscribe('resultado-consulta-imovel', function (err) {
        if (!err) {
            console.clear()
            console.log("Datas Imovel");

            client.publish('consulta-imovel', "");
            //client.publish('registra-imovel', JSON.stringify(imovel));
            //client.end();
        }
    });
});

client.on('message', function (topic, message) {
    if (topic === "resultado-consulta-imovel") {
        const lista = JSON.parse(message.toString());

        console.log(lista);
        client.end();
    }
});