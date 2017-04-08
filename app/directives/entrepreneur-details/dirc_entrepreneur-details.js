app.directive('entrepreneurDetails', function() {
  return {
    templateUrl: 'directives/entrepreneur-details/entrepreneur-details.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope) {
      $scope.countries = {
        1: 'Uganda'
      };

      $scope.statuses = [
        'DRAFT',
        'LIVE',
        'FUNDED'
      ];


      $scope.entrepreneur.tempImage='';
      $scope.entrepreneur.newImage='';

      var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.entrepreneur.imageChanged = true;
            $scope.entrepreneur.tempImage=evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    }
  }
});
