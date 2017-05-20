app.controller('ListaController', function ($scope, $http, ListaFactory, $mdDialog, $mdToast) {
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
    vm.excluir = false;
  };

  vm.ordenarListaPor = function (campo) {
    console.log(campo);
  };

  vm.selecionaContrato = function (ev, contrato) {
    $mdDialog.show({
      controller: contratoModalController,
      templateUrl: 'resources/modulos/contrato/contrato.modal.template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      fullscreen: true,
      locals: {
        contrato: contrato
      }
    })
      .then(function (answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function () {
        vm.status = 'You cancelled the dialog.';
      });
  };

  function contratoModalController($scope, $mdDialog, contrato) {
    $scope.edicao = false;
    $scope.ct = contrato;

    console.log($scope.ct);
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

  vm.confirmaExclusao = function (ev) {
    var totalSelecionado = 0;
    vm.lista.forEach(function (item) {
      if (item.selecionado) {
        totalSelecionado++;
      }
    });

    if (totalSelecionado > 0) {
      var confirm = $mdDialog.confirm()
        .title('Tem certeza que deseja excluir os contatos selecionados?')
        .textContent('Esta ação não poderá ser desfeita.')
        .ariaLabel('Confirmação de exclusão')
        .targetEvent(ev)
        .ok('Sim!')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function () {
        vm.excluirContratosSelecionados();
      }, function () {
        console.info = 'Cancelamento de exclusão';
      });
    } else {
      notification('Selecione algum contrato para excluir');
    }

  };

  function notification(text) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position("top right")
        .hideDelay(3000)
    );
  };

  function activate() {
    vm.getListaContratos();
  }

  activate();
});