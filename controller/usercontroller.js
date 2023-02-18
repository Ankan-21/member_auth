
const member=require('../model/member')
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

const dashboard=(req,res)=>{
    if (req.member) {
        member.find({}, function(err, memberdetails) {
            if (!err) {
                res.render("Dashboard", {
                    title: "member | dashboard",
                    data: req.member,
                    details: memberdetails
                })
            } else {
                console.log(err);
            }
        })
    }

}
const register=(req,res)=>{
    res.render('Register',{
        message: req.flash('message'),
    })

}
const login=(req,res)=>{
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render("Login", {
        title: "Login",
        message: req.flash('message'),
        data: loginData
    })

}
const register_create=(req,res)=>{
   //console.log(req.body);
   member({
    memberName: req.body.membername,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
}).save((err, member) => {
    if (!err) {
        //console.log("User Added Successfully...");
        req.flash("message", "member Added");
        res.redirect("/login");
    } else {
        console.log("member Not Added...", err);
    }
})

}


const login_create=(req,res)=>{
    member.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const hashPassword = data.password;
            if (bcrypt.compareSync(req.body.password, hashPassword)) {
                const token = jwt.sign({
                    id: data._id,
                   membername: data.memberName
                }, "ankan23233387", { expiresIn: '5m' });
                res.cookie("userToken", token);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data);
                res.redirect("/dashboard");
            } else {
                req.flash("message", "Invalid Password");
                res.redirect("/login");
            }

        } else {
            req.flash("message", "Invalid Email");
            res.redirect("/login");
        }
    })

}




//auth checking
memberAuth = (req, res, next) => {
    if (req.member) {
        console.log(req.member);
        next();
    } else {
        console.log(req.member);
        res.redirect("/login");
    }
}

//logout

const logout=(req,res)=>{
    res.clearCookie("userToken");
    res.redirect("/login");
}

module.exports={
    register,register_create,login,login_create,dashboard,memberAuth,logout
}


