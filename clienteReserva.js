// JavaScript source code
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {

    client.subscribe('resultado-reserva-imovel', function (err) {
        if (!err) {
            console.clear()
            console.log("Reserva Imovel");

            client.publish('reserva-imovel', JSON.stringify(2));
            //client.end();
        }
    });
});

client.on('message', function (topic, message) {
    if (topic === "resultado-reserva-imovel") {
        const lista = JSON.parse(message.toString());

        console.log(lista);
        client.end();
    }
});