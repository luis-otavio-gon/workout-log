var app = angular.module('CrudApp');

app.controller('CrudController', function($scope, $http){
	
	// chama função atualizaTabela
	$scope.consulta = function(){
			atualizaTabelaCarro();
	};

	// chama API - insere no banco de dados e atualiza tabela
	$scope.insere = function(){
		$http.post('http://localhost:3000/insere', $scope.work)
		.then(function (response){
				atualizaTabelaExercicio();
				alert("Exercicio adicionado");
		}
		);
	}
	// chama API - remove do banco de dados e atualiza tabela
	$scope.remove = function(id_work){
		var resposta = confirm("Confirma a exclusão do exercicio /");
		if (resposta == true){
			$http.delete('http://localhost:3000/remove/' + id_work)
			.then(function (response){
				atualizaTabelaExercicio();
				alert("Remoção com sucesso");
			}
			);
		}
	}
	// coloca o exercicio para edição
	$scope.preparaAtualizacao = function(id_work){
		var posicao = retornaIndice(id_work);
		$scope.work = {
			'time': $scope.listWorkss[posicao].time,
			'type': $scope.listWorks[posicao].type,
			'date': $scope.listWorks[posicao].date
		};
	}
	// função que retorna a posição de um exercicio pelo id_work
	function retornaIndice(id_work){
		var i;
		for (i=0;i<$scope.listWorks.length;i++){
			if ($scope.listWorks[i].id_work == id_work){
				return i; // retorna posição do exercicio desejado
			}
		}
		return -1;
	}
	// chama API - atualiza o banco de dados e atualiza tabela
	$scope.atualiza = function(){
		alert($scope.id_work);
		$http.put('http://localhost:3000/atualiza', $scope.work)
		.then(function (response){
				atualizaTabelaExercicio();
				alert("Atualização com sucesso");
		}
		);
	}
});