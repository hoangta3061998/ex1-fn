app.controller("MainController", [
  "$scope",
  "MyService",
  function($scope, MyService) {
    MyService.getData().then(function(data) {
      $scope.tree = data;
    });
    $scope.search = function() {
      function search(item, text) {
        try {
          if (item.children.site) {
            item.children.site.forEach(element => {
              if (element.code.toLowerCase().indexOf(text) !== -1) {
                element.isMatched = true;
              } else {
                element.isMatched = false;
              }
            });
          }
          if (item.children.organisation.length > 0) {
            item.children.organisation.forEach(element => {
              search(element, text);
            });
          }
          return item;
        } catch (err) {
          console.log(err);
        }
      }
      search($scope.tree, $scope.searchString);
      console.log($scope.tree);
    };
  }
]);
