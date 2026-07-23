const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true }
);

const blackListModel = mongoose.model("Blacklist", blacklistSchema);
module.exports = blackListModel
