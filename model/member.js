
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    memberName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
});

const memberModel = new mongoose.model("member", memberSchema);
module.exports = memberModel;