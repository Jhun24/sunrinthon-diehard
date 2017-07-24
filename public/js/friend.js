/**
 * Created by janghunlee on 2017. 7. 25..
 */

$(document).ready(function(){
    "use strict";
   $.ajax({
       method:"GET",
       url:"http://localhost:3000/auth/token",
       success:function (data) {
            $.ajax({
                method:"GET",
                url:"http://localhost:3000/friend/getList?token="+data,
                success:function(data){


                        var html;
                        for (var i = 0; i < data["list"].length; i++) {
                            html += " <div class=\"friend-data\"><div class=\"profile-img\"></div> <div class=\"name\"> <p>친구 이름</p> <div class=\"name-data\">"
                            html += "<h5>" + data["list"][i].split("#")[0] + "</h5>" + "<p>" + data["list"][i].split("#")[1] + "</p>"
                            html += "     </div></div> <div class=\"result\"> <h5>사용자님과의 전적</h5>"
                            html += "<p>" + data["result"][i]["win"] + "승" + data["result"][i]["lose"] + "패" + "</p></div> </div>"
                        }
                        $(".friend-list").html(html);

                },
                error:function(err){
                    var html = " ";
                    console.log(err["status"]);
                    if(err["status"] == 404){
                        $(".friend-list").html(html);
                    }
                }
            })
       },
       error:function(err)
       {
           console.log(err);
       }
   });
});

$(".btn").click(function(){
    "use strict";
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/auth/token",
        success:function(data){
            $.ajax({
                method:'POST',
                url:"http://loaclhost:3000/friend/addFriend",
                data:{"token":data,"name":$(".find").val()},
                success:function(data){
                    console.log(data);
                },
                error:function(err){
                    console.log(err);
                }
            })
        },
        error:function(err){
            console.log(err);
        }
    })
});