/**
 * Created by janghunlee on 2017. 7. 25..
 */
module.exports = route;

function route(app){
    "use strict";
    app.get('/route/noMain',(req,res)=>{
        res.render('index.html');
    });

    app.get('/route/main',(req,res)=>{
        res.render('main.html');
    });

    app.get('/route/login',(req,res)=>{
        res.render('login.html');
    });

    app.get('/route/signup',(req,res)=>{
        res.render('signup.html');
    });

    app.get('/route/makebattle',(req,res)=>{
        res.render('makebattle.html');
    });

    app.get('/route/friend',(req,res)=>{
        res.render('friend.html');
    });
}