const knex = require("../database/knex");

class markersController{
  async index(request, response){
    const user_id = request.user.id;

    const markers = await knex("markers")
    .where({user_id})

    return response.json(markers)
  }
}

module.exports = markersController; 