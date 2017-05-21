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
      .then(function (novoCtResponse) {
        console.log(novoCtResponse); // chamar push na lista
      }, function () {
        console.info('Você cancelou a edição do contrato.');
      });
  };

  vm.addContrato = function (ev) {
    $mdDialog.show({
      controller: contratoModalController,
      templateUrl: 'resources/modulos/contrato/contrato.modal.template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      fullscreen: true,
      locals: {
        contrato: undefined
      }
    })
      .then(function (novoCtResponse) {
        console.log(novoCtResponse); // chamar push na lista
        if (novoCtResponse) vm.lista.push(novoCtResponse);
      }, function () {
        console.info('Você cancelou a edição do contrato.');
      });
  };

  function contratoModalController($scope, $mdDialog, contrato) {
    $scope.edicao = false;
    $scope.dataAtual = new Date();
    $scope.novoct = false;

    (function init() {
      if (contrato) {
        $scope.ct = contrato;
      } else {
        $scope.ct = {};
        $scope.edicao = true;
        $scope.novoct = true;
      }
    })();

    // console.log($scope.ct);
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.salvar = function (novoCt) {
      $mdDialog.hide(novoCt);
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