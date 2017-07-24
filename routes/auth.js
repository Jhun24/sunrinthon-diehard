/**
 * Created by janghunlee on 2017. 7. 24..
 */
module.exports = auth;

function auth(app,userModel,randomstring,session){
    "use strict";
    app.post('/auth/login',(req,res)=>{
       var id = req.body.id;
       var ps = req.body.password;

       userModel.find({"id":id,"password":ps},(err,model)=>{
           if(err) throw err;
           if(!model.length) res.send(404);
           else req.session.token = model[0]["token"]; res.send(model[0]["token"]);
       });
    });

    app.post('/auth/signup',(req,res)=>{
        var id = req.body.id;
        var ps = req.body.password;
        var name = req.body.name;
        var length;
        userModel.find({"id":id},(err,model)=>{
            if(err) throw err;
            if(!model.length){
                userModel.find({},(error,m)=>{
                   if(error) throw error;
                   length = m.length + 1;
                });
                var token = randomstring.generate()
                var userSaveModel = new userModel({"id":id,"password":ps,"name":name,"tag":length,"token":token});

                userSaveModel.save((error,m)=>{
                    if(error) throw error;
                    req.session.token = token;
                    res.send(token);
                });
            }
            else{
                res.send(403);
            }
        })
    });

    app.post('/auth/updateName',(req,res)=>{
        var token = req.body.token;
        var name = req.body.name;

        userModel.update({"token":token},{$set:{"name":name}},(err,model)=>{
            if(err) throw err;
            if(!model.length){
                res.send(503);
            }
            else{
                res.send(200);
            }
        });
    });

    app.get('/auth/token',(req,res)=>{
        res.send(req.session.token);
    });
}