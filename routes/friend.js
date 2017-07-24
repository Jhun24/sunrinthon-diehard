/**
 * Created by janghunlee on 2017. 7. 24..
 */
module.exports = friend;

function friend(app,friendModel,userModel){
    "use strict";
    app.get('/friend/getList',(req,res)=>{
        var token = req.query.token;

        friendModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404);
            }
            else{
                var arr = new Array();
                arr[0] = model[0]["list"];
                arr[1] = model[0]["result"]
                res.send(arr);
            }
        });
    });

    app.post('/friend/addFriend',(req,res)=>{
        var token = req.body.token;
        var name = req.body.name;
        var listArr = new Array();
        var resultArr = new Array();

        var length;

        var checkNum = 0;

        friendModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            if(!model.length) length = 0;
            else{
                for(var i = 0; i<model[0]["list"].length; i++){
                    if(model[0]["list"][i] == name) checkNum = 1;
                }
                length = model[0]["list"].length + 1;
                listArr = model[0]["list"];
                resultArr = model[0]["result"];

            }
        });

        if(checkNum == 1){
            res.send(503);
        }
        else{
            listArr[length] = name;
            resultArr[name] = {
                "win":"0",
                "lose":"0"
            };


            friendModel.update({"token":token},{$set:{"list":listArr,"result":resultArr}},(err,model)=>{
                if(err) throw err;
                res.send(200);
            });
        }

    });

    // app.post('/friend/result',(req,res)=>{
    //     var token = req.body.token;
    //     var winPerson = req.body.name;
    //     var losePerson = req.body.name;
    //
    //     var winArray = new Array();
    //     friendModel.find({"token":token},(err,model)=>{
    //         if(err) throw err;
    //         if(!model.length) res.send(404);
    //         else{
    //             winArray = model[0]["result"];
    //         }
    //     });
    //     winArray[losePerson]["win"]++;
    //
    //     friendModel.update({"token":token},{$set:{"result":winArray}},(err,model)=>{
    //         if(err) throw err;
    //     });
    //
    //     var name = losePerson.split("#")[0];
    //     var loserToken;
    //
    //     userModel.find({"name":name},(err,model)=>{
    //         if(err) throw err;
    //         if(!model.length) res.send(503);
    //         else{
    //             loserToken = model[0]["token"];
    //         }
    //     });
    //
    //     var loseArray = new Array();
    //
    //     friendModel.find({"token":loserToken},(err,model)=>{
    //         if(err) throw err;
    //         if(!model.length) res.send(404);
    //         else{
    //             loseArray = model[0]["result"];
    //         }
    //     });
    //
    //     loseArray[winPerson]["lose"]++;
    //
    //     friendModel.update({"token":loserToken},{$set:{"result":loseArray}},(err,model)=>{
    //         if(err) throw err;
    //         res.send(200);
    //     });
    // });
}