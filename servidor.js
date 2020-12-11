// JavaScript source code
var mqtt = require('mqtt')
var server = mqtt.connect('mqtt://test.mosquitto.org')

const CADASTRA_IMOVEL = 'cadastra-imovel'
const LISTA_IMOVEL = 'lista-imovel'
const RESERVA_IMOVEL = 'reserva-imovel'
const CONSULTA_IMOVEL = 'consulta-imovel'
const QUANTIDADE_IMOVEL = 'quantidade-imovel'


const listaDeImoveis = [
    {
        nome: "Imovel_0",
        cidade: "Cidade_1",
        classe: "Classe_1",
        disponivel: "Disponivel",
    },
    {
        nome: "Imovel_1",
        cidade: "Cidade_1",
        classe: "Classe_2",
        disponivel: "Indisponivel",
    },
    {
        nome: "Imovel_2",
        cidade: "Cidade_2",
        classe: "Classe_3",
        disponivel: "Disponivel",
    }
];

server.on('connect', function () {
    server.subscribe(CADASTRA_IMOVEL, function (err) {
        if (!err) {
            console.log("Cadastra Imovel");
        }
    });

    server.subscribe(CONSULTA_IMOVEL, function (err) {
        if (!err) {
            console.log("Consulta Imovel");
        }
    });

    server.subscribe(LISTA_IMOVEL, function (err) {
        if (!err) {
            console.log("Lista Imovel");
        }
    });

    server.subscribe(RESERVA_IMOVEL, function (err) {
        if (!err) {
            console.log("Reserva Imovel");
        }
    });

    server.subscribe(QUANTIDADE_IMOVEL, function (err) {
        if (!err) {
            console.log("Quantidade Imovel");
        }
    });
});

server.on('message', function (topic, message) {
    console.clear()
    switch (topic) {
        case CADASTRA_IMOVEL:
            const imovel = JSON.parse(message);
            listaDeImoveis.push(imovel);
            console.log(imovel);
            break;
        case CONSULTA_IMOVEL:
            const temp = [];
            for (i = 0; i < listaDeImoveis.length; i++) {
                if (listaDeImoveis[i]["disponivel"] === "Disponivel") {
                    temp.push(listaDeImoveis[i]);
                    console.log(JSON.stringify(listaDeImoveis[i]));
                }
            }
            server.publish('resultado-consulta-imovel', JSON.stringify(temp));
            /*if (nrImovel < listaDeImoveis.length) {
                if (listaDeImoveis[nrImovel]["disponivel"] === "Indisponivel") {
                    server.publish('resultado-consulta-imovel', JSON.stringify("Imovel indisponivel"));
                }
                server.publish('resultado-consulta-imovel', JSON.stringify(listaDeImoveis[nrImovel]));
                console.log(listaDeImoveis[nrImovel]);
            } else {
                server.publish('resultado-consulta-imovel', JSON.stringify("Encaminhe numero valido."));
            }*/
            break;
        case LISTA_IMOVEL:
            server.publish('resultado-lista-imovel', JSON.stringify(listaDeImoveis));
            for (i = 0; i < listaDeImoveis.length; i++) {
                console.log(JSON.stringify(listaDeImoveis[i]));
            }
            break;
        case RESERVA_IMOVEL:
            const indice = parseInt(message);
            if (indice < listaDeImoveis.length) {
                if (listaDeImoveis[indice]["disponivel"] === "Indisponivel") {
                    server.publish('resultado-reserva-imovel', JSON.stringify("Imovel indisponivel"));
                } else {
                    listaDeImoveis[indice]["disponivel"] = "Indisponivel"
                    server.publish('resultado-reserva-imovel', JSON.stringify("Imovel Reservado com sucesso."));
                    console.log(listaDeImoveis[indice]);
                }
            } else {
                server.publish('resultado-reserva-imovel', JSON.stringify("Encaminhe numero valido."));
            }
            
            break;
        case QUANTIDADE_IMOVEL:
            server.publish('resultado-quantidade-imovel', JSON.stringify(listaDeImoveis.length));

    }
    

    

    //console.log(imovel.toString());
    //console.log(">>>>> Topico " + topic + " /// Mensagem: " + message);
})