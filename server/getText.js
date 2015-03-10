$(document).ready(function(){
  
  var init = function(){ 

    var textUrl = "http://127.0.0.1:3000";

    $.ajax({
      url: textUrl,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        var firstFiveWords = data.slice(0,5);

        var $wordsDiv = $('<div></div>');
        for(var i = 0;i<firstFiveWords.length;i++){
          console.log(firstFiveWords[i]);
          var $word = $('<div></div>').text(firstFiveWords[i]);
          $wordsDiv.append($word);
        }
        $('body').append($wordsDiv);
      },
      error: function (data) {
        console.error('failed to Get 404');
      }
    });
  };
  init();
});