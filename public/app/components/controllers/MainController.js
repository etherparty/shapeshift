angular.module('ethershift')
  .controller('MainController', function ($scope, $http, $modal, API_URL) {
    $scope.address = '';
    $scope.etherAmount = 100;
    $scope.btcAmount = null;

    $scope.calculateBTCAmount = function () {
      var amount = Number($scope.etherAmount);

      $http({
        url: API_URL + '/rate'
      })
      .success(function (response) {
        $scope.btcAmount = new BigNumber(amount)
          .dividedBy(response.rate)
          .toNumber();
      });
    };

    $scope.submit = function () {
      $http({
          url: API_URL + '/createOrder',
          params: {
            withdrawalAddress: $scope.address
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

    $scope.calculateBTCAmount();
  });
