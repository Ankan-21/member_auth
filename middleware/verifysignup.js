
const memberModel = require("../model/member");

exports.checkDuplicateEntries = (req, res, next) => {
    memberModel.findOne({
        memberName: req.body.membername
    }).exec((err, member) => {
        if (err) {
            console.log(err);
            return;
        }
        if (member) {
            req.flash("message", "Username Already Exists");
            return res.redirect("/");
        }
        memberModel.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                console.log(err);
                return;
            }
            if (email) {
                req.flash("message", "Email Already Exists");
                return res.redirect("/");
            }
            
            const password = req.body.password;
            const confirm = req.body.confirmpassword;
            if (password !== confirm) {
                req.flash("message", "Password & Confirm Password Are Not Matched");
                return res.redirect("/");
            }
            next();
        })
    })
}