/**
 * Created by janghunlee on 2017. 7. 25..
 */
$(".cancel").click(function(){
    "use strict";
    location.href="login.html";
});

$(".login").click(function(){
    "use strict";
    var id = $(".id").val();
    var ps = $(".ps").val();
    var name = $(".name").val();

    if($(".ps-re").val() == ps){
        $.ajax({
            method:"POST",
            url:"http://169.56.126.158:1234/auth/signup",
            data:{"id":id,"password":ps,"name":name},
            success:function(data){
                console.log(data);
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    else{
        alert("비밀번호 확인을 제대로 해주세요!");
        $(".ps").val("");
        $(".ps-re").val("");
    }
});