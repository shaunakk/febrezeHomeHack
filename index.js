$(document).ready(
  function(){
    $("#float").click(
      function(){
        for(i=1;i<9;i++){
      if($("#option-"+i).parent().hasClass("is-checked")){
        radioChecked=i

      }
    }
        $.get( "http://127.0.0.1:8081?led="+radioChecked);
        console.log(radioChecked)
    }

    )
  }
)
var radioChecked
