app.controller('ListaController', function ($scope, $http) {
  var vm = $scope;

  vm.nome = 'tarcisio.d.silva';
  vm.lista = {};

  vm.getListaContratos = function () {
    $http.get('resources/data_files/JSON.json').then(function (res) {
      vm.lista = res.data;
    }); 
  }

  function activate() {
    vm.getListaContratos();
  }

  activate();
});