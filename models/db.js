var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

function conectar(callback) {
    mongoClient.connect(process.env.MONGO_CONNECTION, (erro, conexao) => {
        if (erro) return console.log('Falha ao conectar no banco' + erro);

        global.conn = conexao.db('aula03');
        callback();
    });
}

function obterClientePorId(id, callback){
    global.conn.collection('clientes').findOne( { _id: objectId(id) }, callback);
}

function listaClientes(callback) {
    global.conn.collection('clientes').find().toArray(callback); // Quando finalizar a consulta converter para array
}

function gravaCliente(cliente, callback) {
    global.conn.collection('clientes').insert(cliente, callback);
}

function updateCliente(id, cliente, callback) {
    global.conn.collection('clientes').update({ _id: objectId(id) }, cliente, callback);
}

function deletaCliente(id, callback) {
    global.conn.collection('clientes').remove({ _id: objectId(id) }, callback);
}

module.exports = { conectar, listaClientes, gravaCliente, updateCliente, deletaCliente, obterClientePorId };