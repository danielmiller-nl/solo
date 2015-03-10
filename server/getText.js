var wordObject;

$(document).ready(function(){

  var init = function(){ 

    var textUrl = "http://127.0.0.1:3000/";

    $.ajax({
      url: textUrl,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        console.log(Object.keys(data).length);
        wordObject = data;
      },
      error: function (data) {
        console.error('failed to Get 404');
      }
    });
  };
  init();
});