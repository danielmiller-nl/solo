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
        console.log("DATA ", data);
        $scope.words = data;
      }).catch(function(error) {
        console.error(error);
      })
      $scope.seeIfHasWord = function(tWord){
        $scope.hasWord = !!$scope.words[tWord];
      };
      $scope.printWordsFrom = function(letters){
        var c = letters;
        var toPrint = [];
        for(var i = 0;i<c.length;i++){
          var letter = c[i];
          var remaining = c.slice(0,i)+c.slice(i+1);
          for(var j = 0;j<remaining.length;j++){
            var newWord = remaining.slice(0,j)+letter+remaining.slice(j+1);
            console.log(newWord);
            if(!!$scope.words[newWord]){
              toPrint.push(newWord);
            }
          }
        }
        $scope.toPrint = toPrint;
      };
  }])
  .factory('GetWords', function($http) {
    var getWords = function() {
       console.log("test2");
      return $http({
        method: 'GET',
        url: '/words'
      }).then(function(res) {
        console.log(res.data);
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
        //console.log(word);
        return !!wordList[word];
      }
    }
  });



  // .factory('getWords', function($http) {
  // var promise;
  // var getWords = {
  //   async: function() {
  //     if ( !promise ) {
  //       // $http returns a promise, which has a then function, which also returns a promise
  //       promise = $http.get('http://127.0.0.1:3000/').then(function (response) {
  //         // The then function here is an opportunity to modify the response
  //         console.log(response);
  //         // The return value gets picked up by the then in the controller.
  //         return response.data;
  //       });
  //     }
  //     // Return the promise to the controller
  //     return promise;
  //   }
  // };
  // return getWords;
  // })


// .factory('counter', [function(){
//     return {
//         increment: function(toIncrease){
//           var increased = toIncrease+1;
//           return increased;
//         },
//         FizzBuzz: function(number){
//           if(number%3==0&&number%5==0){
//             return "FizzBuzz";
//           } else if (number%3==0){
//             return "Fizz"
//           } else if (number%5==0){
//             return "Buzz";
//           } else {
//             return number;
//           }
//         } 
//     }               
// }]);
