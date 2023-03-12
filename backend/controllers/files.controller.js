const { FileModel } = require("../db/files")
const { UserModel } = require("../db/users")

async function findById(id) {
    return FileModel.findById(id);
}

async function createFiles(userId, filename, url) {
    file = await FileModel.create({
        url: url,
        name: filename,
        author: {
            _id: userId
        }
    })
    file = file.toJSON();
    return file

}

module.exports = {
    findById,
    createFiles
}


