/**
 * Created by janghunlee on 2017. 7. 25..
 */

$(document).ready(function(){
    "use strict";
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/battle/fight",
        success:function(data){
            if(data[0]["fight"] == "false"){
                location.href="http://localhost:3000/noMain"
            }
        },
        error:function(err){
            console.log(err);
        }
    })
});