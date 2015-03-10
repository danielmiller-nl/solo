angular.module('getWords', ['ngRoute'])

  .config(function($routeProvider){
    console.log("test1");
    $routeProvider
      .when('/',{
        controller:'GetWordsCtrl',
        template:'<input type="text" ng-model="typedWord" ng-change="printWordsFrom(typedWord)"/><pre>{{ hasWord }},{{typedWord}},{{toPrint}}</pre>',
        resolve:{
          'GetWordsData':function(GetWords){
            console.log("test4");
            return GetWords.promise;
          }
        }
      })
  })
  .controller( 'GetWordsCtrl', ['$scope','GetWords', 'wordFind', function ( $scope, GetWords, wordFind ) {
      console.log(GetWords.getWords());
      $scope.words = GetWords.getWords();
      $scope.hasWord = "";
      $scope.toPrint = "";
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
  .service('GetWords',function($http){
    var wordList = null;

    var promise = $http.get('http://127.0.0.1:3000/').success(function (data) {
      wordList = data;
    });
    return {
      promise:promise,
      setData: function (data) {
          wordList = data;
      },
      getWords: function () {
          console.log("test3");
          return wordList;
      }
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
