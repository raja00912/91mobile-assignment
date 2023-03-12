const mongoose = require("mongoose")

const FilesSchema = new mongoose.Schema({
    url: String,
    name: String,
    author: {
        _id: mongoose.Types.ObjectId
    }
}, {
    timestamps: true
})

const FileModel = mongoose.model("files", FilesSchema);

module.exports = {
    FileModel
}