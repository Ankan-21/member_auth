
const router = require("express").Router();
const usercontroller = require("../controller/usercontroller");
const verify=require('../middleware/verifysignup')
//const AuthController = require("../controllers/AuthController");

router.get("/", usercontroller.register);
router.post("/register",[verify.checkDuplicateEntries], usercontroller.register_create);
router.get("/login",usercontroller.login);
router.post("/login_create",usercontroller.login_create);
router.get("/dashboard",usercontroller.memberAuth,usercontroller.dashboard);
router.get("/logout", usercontroller.logout);

module.exports = router;