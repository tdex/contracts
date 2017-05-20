app.controller('MainController', function ($scope, $mdSidenav, $mdDialog) {
  var vm = $scope;
  var originatorEv;
  vm.title = 'Contratos';

  // abre e fecha menu
  vm.toggleLeft = buildToggler('left');
  vm.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    };
  }

  vm.openMenuReordenacao = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  vm.opcoesMenu = [
    {order: 'codigo', nome: 'Código'},
    {order: 'dataAcordo', nome: 'Data acordo comercial'},
    {order: 'natureza', nome: 'Natureza'},
    {order: 'comprador', nome: 'Comprador'},
    {order: 'vendedor', nome: 'Vendedor'},
    {order: 'energiaReferencia', nome: 'Energia referência'},
    {order: 'energiaEntregue', nome: 'Energia entregue'},
    {order: 'status', nome: 'Status aprovação'},
    {order: 'modelo', nome: 'Modelo'},
    {order: 'preco', nome: 'Preço base contratado'},
    {order: 'submercado', nome: 'Submercado'},
    {order: 'inicioFornecimento', nome: 'Início fornecimento'},
    {order: 'fimFornecimento', nome: 'Fim fornecimento'},
    {order: 'inicioVigencia', nome: 'Início vigência'},
    {order: 'fimVigencia', nome: 'Fim vigência'}
  ]
});