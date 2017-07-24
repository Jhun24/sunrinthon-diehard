/**
 * Created by janghunlee on 2017. 7. 25..
 */
$(".login").click(function(){
    "use strict";
    var id = $(".id").val();
    var ps = $(".ps").val();
    console.log("Access");
    $.ajax({
        method:"POST",
        url:"http://localhost:3000/auth/login",
        data:{"id":id,"password":ps},
        success:function(data){
            location.href="http://localhost:3000/noMain"
        },
        error:function(err){
            console.log(err);
        }
    })
});

$(".signup").click(function(){
    "use strict";
    location.href="http://localhost:3000/signup"
});