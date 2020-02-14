var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'Cadastro de Clientes', cliente: { } });
});

router.get('/:id', function (req, res, next) {
    
    var db = require('../models/db');
    db.obterClientePorId(req.params.id, function (erro, doc) {
        
        if (erro) return console.log('Falha ao obter dados do cliente');
        res.render('new', { title: 'Editar Cliente', cliente: doc }); 
    });
});

router.post('/', function(req, res, next) {

    var id = req.body.id;
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var db = require('../models/db');

    if (id != "") {
        db.updateCliente( id, { nome, idade }, function(erro, sucesso) {
            if (erro) return console.log(erro);
            res.redirect('/');
        }); 
    }
    else {
        db.gravaCliente({ nome, idade }, function(erro, sucesso) {
            if (erro) return console.log('Ocorreu um erro ao salvar os dados');
            res.redirect('/');
        });
    }
});

module.exports = router;
