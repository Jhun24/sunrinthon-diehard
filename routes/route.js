/**
 * Created by janghunlee on 2017. 7. 25..
 */
module.exports = route;

function route(app){
    "use strict";

    app.get('/main',(req,res)=>{
        res.render('main.html');
    });

    app.get('/noMain',(req,res)=>{
        res.render('index.html')
    });

    app.get('/',(req,res)=>{
        console.log("/ access");
        res.render('login.html');
    });

    app.get('/signup',(req,res)=>{
        res.render('signup.html');
    });

    app.get('/makebattle',(req,res)=>{
        res.render('makebattle.html');
    });

    app.get('/friend',(req,res)=>{
        res.render('friend.html');
    });
}