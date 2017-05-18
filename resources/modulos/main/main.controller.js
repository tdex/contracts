app.controller('MainController', function ($scope, $mdSidenav) {
  var vm = $scope;

  vm.title = 'Lista de contratos';
  var originatorEv;

  vm.toggleLeft = buildToggler('left');
  vm.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    };
  }

  vm.openMenu = function ($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  };
});