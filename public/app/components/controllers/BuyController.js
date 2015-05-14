angular.module('ethershift')
  .controller('BuyController', function ($scope, $modalInstance, address, btcAmount) {
    $scope.address = address;
    $scope.btcAmount = Number(btcAmount);

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });