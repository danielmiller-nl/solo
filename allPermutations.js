/**
 * Given a single input string, write a function that produces all possible anagrams
 * of a string and outputs them as an array. At first, don't worry about
 * repeated strings.  What time complexity is your solution?
 *
 * Extra credit: Deduplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

var allPermutations = function(string,size) {
  size = size || string.length;
  if(string.length <= 1){
    return [string];
  }

  var uniqueAnagrams = {};

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
            uniqueAnagrams[newStr] = true;
          } else {
            permutations.push(newStr);
          }
        })
      });
      return permutations;
    }
  };

  recursivePermutation(string);

  return Object.keys(uniqueAnagrams);
};
