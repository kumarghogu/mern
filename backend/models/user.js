const mongoose = require("mongoose")
const crypto = require("crypto")
const { v4: uuidv4 } = require("uuid")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    userinfo: {
        type: String,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv4()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {

    isAuthenticate: function(password) {
        return this.encryptPassword(password) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac("sha256", this.salt)
            .update(password)
            .digest("hex")
        }
        catch(error) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)