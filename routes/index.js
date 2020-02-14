var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var db = require('../models/db');
  db.listaClientes(function(erro, docs) {
    if (erro) return console.log('Erro');

    res.render('index', { title: 'Clientes', cliente: docs });
  });
});

router.get('/delete/:id', function(req, res, next) {
  
  var db = require('../models/db');

  db.deletaCliente(req.params.id, function (erro, sucesso) {
    if (erro) return console.log('Falha ao remover o cliente');

    res.redirect('/');
  });
});

module.exports = router;
