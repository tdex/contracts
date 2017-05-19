app.controller('ListaController', function ($scope, $http, ListaFactory, $mdDialog) {
  var vm = $scope;

  vm.lista = {};

  vm.getListaContratos = function () {
    $http.get('resources/data_files/JSON.json').then(function (res) {
      vm.lista = ListaFactory.convertList(res.data);
    });
  };

  vm.selecionaTodos = function () {
    if (vm.lista) {
      vm.lista.forEach(function (ct) {
        ct.selecionado = !angular.isUndefined(ct.selecionado) ? vm.todosSelecionados : true;
      });
      vm.todosSelecionados = !vm.todosSelecionados;
    }
  };

  vm.excluirContratosSelecionados = function () {
    if (vm.lista) {
      for (var tamanhoLista = vm.lista.length, ct = tamanhoLista - 1; ct >= 0; ct--) {
        if (vm.lista[ct].selecionado) {
          vm.lista.splice(ct, 1);
        }
      }
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
      clickOutsideToClose: false,
      fullscreen: true//vm.customFullscreen // Only for -xs, -sm breakpoints.
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