app.controller('ListaController', function ($scope, $http, ListaFactory, $mdDialog) {
  var vm = $scope;

  vm.nome = 'tarcisio.d.silva';
  vm.lista = {};
  vm.todosSelecionados = false;
  // vm.filtroPesquisa = 'aprovado';

  vm.getListaContratos = function () {
    $http.get('resources/data_files/JSON.json').then(function (res) {
      vm.lista = ListaFactory.convertList(res.data);
    });
  };

  vm.selecionaTodos = function () {
    if (vm.lista) {
      vm.lista.forEach(function (ct) {
        ct.selecionado = vm.todosSelecionados;
      }).then(function () {
        vm.todosSelecionados = !vm.todosSelecionados;
      });
    }
  };

  vm.ordenarListaPor = function (campo) {
    alert(campo);
  };

  vm.selecionaContrato = function (ev) {
    $mdDialog.show({
      controller: contratoModalController,
      templateUrl: 'resources/modulos/contrato/contrato.modal.template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    })
      .then(function (answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function () {
        vm.status = 'You cancelled the dialog.';
      });
  };

  function contratoModalController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }

  function activate() {
    vm.getListaContratos();
  }

  activate();
});