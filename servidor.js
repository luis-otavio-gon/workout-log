var express = require('express')
// lidando com session
var session = require('express-session')
var app = express()

var bodyParser = require('body-parser')

var core_use = require('cors');
var pg = require('pg');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/front/views');
app.set('view engine', 'html');
app.use('/front',express.static(__dirname + '/front'));
app.use(core_use());
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var sess;

// JSON de configuração de conexão com banco de dados
var config = {
	user: "postgres",
	database: "tb_workout",
	password: "123",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
// cria o canal de comunicação com o banco de dados
var canal = new pg.Pool(config);


// cria rota para consulta em uma tabela do banco de dados
app.get('/consulta', function (req, res){

	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'select * from tb_workout order by 1';
		console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na consulta da tabela', erro);
			}
			res.json(resultado.rows); // retorna ao cliente as linhas do select
		});
	});
});
// cria rota para consulta em uma tabela do banco de dados
app.post('/insere', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'INSERT INTO tb_workout VALUES (default, \'' + req.body.time +
				  '\', ' + req.body.type + ', ' + req.body.date + ');';
		console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na inserção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da inserção
		});
	});
});

// cria rota para consulta em uma tabela do banco de dados
app.delete('/remove/:id_work', function (req, res){
	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = 'delete from tb_carro where id_work = \'' + req.params.id_work +'\' ';
		console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
});

app.listen(3000, function(){
	console.log("SERVIDOR ON");
})