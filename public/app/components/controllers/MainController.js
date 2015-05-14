angular.module('ethershift')
  .controller('MainController', function ($scope, $http, $modal) {
    $scope.address = '';
    $scope.etherAmount = null;
    $scope.btcAmount = null;

    $scope.calculateBTCAmount = function () {
      var amount = Number($scope.etherAmount);

      BigNumber.config({
        DECIMAL_PLACES: 8
      });

      $scope.btcAmount = new BigNumber(amount)
        .dividedBy(25)
        .dividedBy(1.025)
        .toNumber();
    }

    $scope.submit = function () {
      $http({
          url: '/createOrder',
          params: {
            amount: $scope.btcAmount // TODO: refactor to etherAmount and calculate on serverside
          }
        })
        .success(function (response) {
          console.log(response);

          var modal = $modal.open({
            templateUrl: 'app/components/templates/modal.html',
            controller: 'BuyController',
            resolve: {
              address: function () {
                return response.address;
              },
              btcAmount: function () {
                return response.amount_in_btc;
              }
            }
          });
        });
    };
  });