/**
 * Created by janghunlee on 2017. 7. 24..
 */

module.exports = battle;

function battle(app,battleModel,randomstring , userModel){
    "use strict";
    app.post('/battle/setRoom',(req,res)=>{
        var user1Name = req.body.user1Name;
        var user2Name = req.body.user2Name;

        var reward = req.body.reward;
        var target = req.body.target;
        var battleText = req.body.battleText;

        var token = randomstring.generate();

        var receive = "false";

        var battleSaveModel = new battleModel({"user1Name":user1Name,"user2Name":user2Name,"reward":reward,"target":target,"battleText":battleText,"roomToken":token,"receive":receive});

        battleSaveModel.save((err,model)=>{
           if(err) throw err;
           res.send(200);
        });
    });

    app.get('/battle/check',(req,res)=>{
        var name = req.query.username;

        battleModel.find({"user1Name":name},(err,model)=>{
            if(err) throw err;
            if(!model.length){
                battleModel.find({"user2Name":name},(err,m)=>{
                    if(err) throw err;
                    if(!model.length){
                        res.send(404);
                    }
                    else{
                        res.send(m[0]["user1Name"]);
                    }
                });
            }
            else{
                res.send(model[0]["user2Name"]);
            }
        });
    });

    app.post('/battle/receive',(req,res)=>{
        var name = req.body.name;

        battleModel.find({"user1Name":name},(err,model)=>{
            if(err) throw err;
            if(!model.length){
                battleModel.find({"user2Name":name},(err,m)=>{
                    if(err) throw err;
                    if(!model.length){
                        res.send(404);
                    }
                    else{
                        battleModel.update({"user2Name":name},{$set:{"receive":"true"}},(err,mo)=>{
                            if(err) throw err;
                            res.send(200);
                        });
                    }
                });
            }
            else{
                battleModel.update({"user1Name":name},{$set:{"receive":"true"}},(err,mo)=>{
                    if(err) throw err;
                    res.send(200);
                });
            }
        });
    });

    app.post('/battle/userUpdate',(req,res)=>{
        var name = req.body.name;
        var data = req.body.data;

        battleModel.find({"user1Name":name},(err,model)=>{
            if(err) throw err;
            if(!model.length){
                battleModel.find({"user2Name":name},(err,model)=>{
                    if(err) throw err;
                    if(!model.length){
                        res.send(503);
                    }
                    else{
                        battleModel.update({"user2Name":name},{$set:{"user2Data":data}},(err,model)=>{
                            if(err) throw err;
                            res.send(200);
                        });
                    }
                });
            }
            else{
                battleModel.update({"user1Name":name},{$set:{"user1Data":data}},(err,modsel)=>{
                    if(err) throw err;
                    res.send(200);
                });
            }
        });
    });

    app.post('/battle/finish',(req,res)=>{
        var name = req.body,name;
        var winner = req.body.winner;
        var loser = req.body.loser;
        battleModel.find({"user1Name":name},(err,model)=>{
           if(err) throw err;
           if(!model.length){
               battleModel.find({"user2Name":name},(err,model)=> {
                   if (err) throw err;
                    if(!model.length){
                        res.send(404);
                    }
                    else{
                        battleModel.update({"user2Name":name},{$set:{"winner":winner,"loser":loser}},(err,model)=>{
                            if(err) throw err;
                            res.send(200);
                        });
                    }
               });
           }
           else{
               battleModel.update({"user1Name":name},{$set:{"winner":winner,"loser":loser}},(err,model)=>{
                   if(err) throw err;
                   res.send(200);
               });
           }
        });
    });

    app.get('/battle/fight',(req,res)=>{
        userModel.find({"token":req.session.token},(err,model)=>{
            if(err) throw err;
            res.send(model);
        })
    });
}