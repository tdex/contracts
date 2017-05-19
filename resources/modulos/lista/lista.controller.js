app.controller('ListaController', function ($scope, $http, ListaFactory) {
  var vm = $scope;

  vm.nome = 'tarcisio.d.silva';
  vm.lista = {};
  vm.todosSelecionados = false;
  // vm.filtroPesquisa = 'aprovado';

  vm.getListaContratos = function () {
    $http.get('resources/data_files/JSON.json').then(function (res) {
      vm.lista = ListaFactory.convertList(res.data);
    });
  }

  vm.selecionaTodos = function () {
    if (vm.lista) {
      vm.lista.forEach(function (ct) {
        ct.selecionado = vm.todosSelecionados;
      }).then(function () {
        vm.todosSelecionados = !vm.todosSelecionados;
      });
    }
  }

  vm.ordenarListaPor = function (campo) {
    alert(campo);
  }

  function activate() {
    vm.getListaContratos();
  }

  activate();
});