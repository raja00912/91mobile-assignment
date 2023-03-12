const { FileModel } = require("../db/files")
const { UserModel } = require("../db/users")

async function findById(id) {
    return FileModel.findById(id);
}

async function createFiles(userId, filename, url) {
    try {
        const file = await FileModel.create({
            url: url,
            name: filename,
            author: {
                _id: userId
            }
        })
        return file

    } catch (err) {
        return err;
    }

}

module.exports = {
    findById,
    createFiles
}


