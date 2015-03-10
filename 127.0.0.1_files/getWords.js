angular.module('getWords', ['ngRoute'])

  .config(function($routeProvider){
    console.log("test1");
    $routeProvider
      .when('/',{
        templateUrl:'/client/wordDisplay/wordDisplay.html',
        controller:'GetWordsCtrl',
      })
  })
  .controller( 'GetWordsCtrl', ['$scope','GetWords', 'wordFind', function ( $scope, GetWords, wordFind ) {
      
      $scope.words = "";
      $scope.hasWord = "";
      $scope.toPrint = "";
      GetWords.getWords().then(function(data) {
        $scope.words = data;
      }).catch(function(error) {
        console.error(error);
      })
      $scope.seeIfHasWord = function(tWord){
        $scope.hasWord = !!$scope.words[tWord];
      };
      $scope.printWordsFrom = function(letters){
        console.log(letters.split(""));
        var possibleWords = Combinatorics.permutation(letters.split(""),3);
        var toPrint = [];
       
        $scope.toPrint = possibleWords;
      };
  }])
  .factory('GetWords', function($http) {
    var getWords = function() {
       console.log("test2");
      return $http({
        method: 'GET',
        url: '/words'
      }).then(function(res) {
        return res.data;
      });
    };
    return {
      getWords: getWords
    };
  })
  .factory('wordFind', function(){
    return {
      hasWord: function(wordList,word){
        return !!wordList[word];
      }
    }
  });
