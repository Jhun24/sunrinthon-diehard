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
        url:"http://169.56.126.158:1234/auth/login",
        data:{"id":id,"password":ps},
        success:function(data){
            console.log(data);
        },
        error:function(err){
            console.log(err);
        }
    })
});