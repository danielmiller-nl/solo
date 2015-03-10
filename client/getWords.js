angular.module('getWords', ['ngRoute'])

  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl:'/client/wordDisplay/wordDisplay.html',
        controller:'GetWordsCtrl',
      })
  })
  .controller( 'GetWordsCtrl', ['$scope','GetWords', 'ThreeLetterPermutations', function ( $scope, GetWords, ThreeLetterPermutations ) {
      
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

        var possibleWords = ThreeLetterPermutations.TLPs(letters);

        var toPrint = [];
        for(var i = 0;i<possibleWords.length;i++){
          if($scope.words[possibleWords[i]]){
            toPrint.push(possibleWords[i]);
          }
        }
        toPrint = toPrint.sort();
        var toPrintString = "";
        var subString = "";
        for(var j = 0;j<toPrint.length;j++){
          subString += toPrint[j]+", ";
          if(j%10==0){
            toPrintString+=subString+"\n";
            subString = "";
          }
        }
        toPrintString+=subString;
        $scope.toPrint = toPrintString;
      };
  }])
  .factory('GetWords', function($http) {
    var getWords = function() {
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
  .factory('ThreeLetterPermutations', function(){
    
    var allPermutations = function(string,currentPs) {

      if(string.length <= 1){
        return [string];
      }

      var insertLetterAt = function(str,letter,index){
        return str.slice(0,index)+letter+str.slice(index);
      };

      var forEachInsertion = function(str,letter,callback){
        for(var i = 0;i<=str.length;i++){
          callback(insertLetterAt(str,letter,i));
        }
      };

      var recursivePermutation = function(str){
        var strL = str.length;
        if(str.length == 1){
          return [str];
        } else {
          var permutations = [];
          var pOWFLR = recursivePermutation(str.slice(1)); // permutationsOfStringWithFirstLetterRemoved
          var firstLetter = str[0];
          pOWFLR.forEach(function(element,index,array){
            forEachInsertion(element,firstLetter,function(newStr){
              if(str === string){
                currentPs[newStr] = true;
              } else {
                permutations.push(newStr);
              }
            })
          });
          return permutations;
        }
      };
      recursivePermutation(string);

    };
    var threeLetterCombos = function(letters){
      var combos = [];
      for(var i = 0;i<letters.length-2;i++){
        for(var j = i+1;j<letters.length-1;j++){
          for(var k = j+1;k<letters.length;k++){
            combos.push(letters[i]+letters[j]+letters[k]);
          }
        }
      }
      return combos;
    }
    return {
      TLPs: function(letters){
        var uniquePermutations = {};
        if(letters.length<3){
          return [];
        }
        var tLPs = [];
        var tLCs = threeLetterCombos(letters);

        for(var i = 0;i<tLCs.length;i++){
          allPermutations(tLCs[i],uniquePermutations);
        }
        return Object.keys(uniquePermutations);
      }
    }
  });
