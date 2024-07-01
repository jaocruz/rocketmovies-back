const knex = require("../database/knex");
const appError = require("../utils/appError");
const diskStorage = require("../providers/diskStorage");

class userAvatarController{
  async update(request, response){
    const user_id = request.user.id 
    const avatarFilename = request.file.filename;

    const DiskStorage = new diskStorage();

    const user = await knex("users")
    .where({ id: user_id }).first();

    if(!user){
      throw new appError("Somente uusários autenticados podem mudar o avatar", 401);
    }

    if(user.avatar){
      await DiskStorage.deleteFile(user.avatar);
    }

    const filename = await DiskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = userAvatarController;