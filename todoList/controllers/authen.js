var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('../models/todoDB.js');
var crypt = require('../cryptoFunctions/cryptofunctions.js'); 
var session = require("client-sessions");

//Demo registration
demoRegister = function(name, plaint_password){
    Todo.find({'userName': name}).count(function(err, number){
        if(number > 0)
        {
            console.log('User name already exists');
        }
        else{
            //console.log(post_data.password);
            var hash_data = crypt.saltHashPassword(plaint_password);

            var pass = hash_data.passwordHash;
            var salt_ = hash_data.salt;

            var newitem = new Todo({
                userName: name,
                password: pass,
                salt: salt_        
            });
            Todo.create(newitem, function(err, todo){
                if(err) {console.log(err); res.render("login.ejs");}
        
                else{
                    console.log("Inserted Item: "+newitem);
                }
            });
    

        }
    });
}

//Login Page
get = function(req, res){
    res.render("login.ejs");
};

//Register user
register = function(req, response){
    
    var post_data = req.body;
    var name = post_data.item[0];

    //console.log(post_data);
    
    Todo.find({'userName': name}).count(function(err, number){
        if(number > 0)
        {
            response.render("login.ejs");
            console.log('User name already exists');
        }
        else{
            var plaint_password = post_data.item[1];
        
            //console.log(post_data.password);
            var hash_data = crypt.saltHashPassword(plaint_password);

            var pass = hash_data.passwordHash;
            var salt_ = hash_data.salt;

            var newitem = new Todo({
                userName: name,
                password: pass,
                salt: salt_        
            });
            Todo.create(newitem, function(err, todo){
                if(err) {console.log(err); res.render("login.ejs");}
        
                else{
                    console.log("Inserted Item: "+newitem);
                    response.render("login.ejs");
                }
            });
    

    }
    
});

    
    
}

//Login user
login = function(req, response) {
    var post_data = req.body;
    
    var name = post_data.item[0];
    var userPassword = post_data.item[1];

    req.session.name = name;
    req.session.password = userPassword;
    //Check exists user
    Todo.find({'userName': name}).count(function(err, number){
            if(number == 0)
            {
                response.render("login.ejs");
                console.log('User does not exist');
            }
            else{
                //Insert  data
                Todo.findOne({'userName':name}, function(err, user){
                        var salt = user.salt;
                        var hashed_password = crypt.checkHashPassword(userPassword, salt).passwordHash;
                        var encrypted_password = user.password;
                        if(hashed_password == encrypted_password){
                            response.render("index.ejs",{todoList: user.todoList});
                            console.log('login success',);
                        }
                        else{
                            console.log('Wrong password');
                            response.render("login.ejs");
                        }
                    });
            }
        
    });
};

var _id;
//submit button route
newtodo = function(req,res){
    console.log("item submitted");
   // console.log(req.body.item);
    console.log('test name ' + req.session.name);
    console.log('test password ' + req.session.password);

    Todo.findOne({'userName': req.session.name}, function(err, Todo_){
        if(err) console.log(err);
            else{
                req.session._id = Todo_._id;
                console.log(Todo_._id)
            }
    }).then(
        Todo.findByIdAndUpdate(req.session._id,{"$addToSet": {"todoList": req.body.item}}, function(err, user_){
            if(err) console.log(err);
            
        })
    ).then(()=>{
        Todo.findById(req.session._id, function(err, user_){
            if(err) console.log(err);
            else{
                res.render("index.ejs",{todoList: user_.todoList});
            }
        });
    });
    
};

removetodo = function(req,res){
    console.log("item removed");
    Todo.findByIdAndUpdate(req.session._id,{"$pull": {"todoList": req.body.item}}, function(err, user_){
        if(err) console.log(err);
    }).then(()=>{
        Todo.findById(req.session._id, function(err, Todo){
            if(err) console.log(err);
            else{
                user_ = Todo;
                res.render("index.ejs",{todoList: user_.todoList});
            }
        });
    });


};

module.exports = {
    get,
    register,
    login,
    newtodo,
    removetodo
}
