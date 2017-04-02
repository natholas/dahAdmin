app.directive('investmentProgress', function() {
  return {
    templateUrl: 'directives/investment-progress/investment-progress.html',
    scope: {entrepreneur: '=data', extra: '=?'}
  }
});
