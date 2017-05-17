app.controller('ListaController', function ($scope, $http, ListaFactory) {
  var vm = $scope;

  vm.nome = 'tarcisio.d.silva';
  vm.lista = {};

  vm.getListaContratos = function () {
    $http.get('resources/data_files/JSON.json').then(function (res) {
      vm.lista = ListaFactory.convertList(res.data);
    }); 
  }

  function activate() {
    vm.getListaContratos();
  }

  activate();
});