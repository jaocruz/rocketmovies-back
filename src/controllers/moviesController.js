const knex = require("../database/knex");

class moviesController{

  async create(request, response){
    const { title, description, rating, markers } = request.body;
    const user_id = request.user.id;

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id
    });

    const markersInsert = markers.map(name => {
      return{
        movie_id,
        user_id,
        name
      }
    });

    await knex("markers").insert(markersInsert);

    return response.json();

  }

  async show(request, response){
    const { id } = request.params;

    const movie = await knex("movies").where({id}).first();
    const markers = await knex("markers").where({movie_id: id}).orderBy("name");

    return response.json({
      ...movie, markers
    });
  }

  async delete(request, response){
    const { id } = request.params;

    await knex("movies").where({id}).delete();

    return response.json();
  }

  async index(request, response){
    const {title, markers} = request.query;

    const user_id = request.user.id

    let movies;

    if(markers){
      const filterMarkers = markers.split(",").map(marker => marker.trim());

      movies = await knex("markers")
      .select([
        "movies.id",
        "movies.title",
        "movies.user_id"
      ])
      .where("movies.user_id", user_id)
      .whereLike("movies.title", `%${title}%`)
      .whereIn("name", filterMarkers)
      .innerJoin("movies", "movies.id", "markers.movie_id")

    }else{
      movies = await knex("movies")
        .where({ user_id})
        .orderBy("title");
    }

    const userMarkers = await knex("markers").where({user_id});
    const moviesWithMarkers = movies.map(movie => {
      const movieMarkers = userMarkers.filter(marker => marker.movie_id === movie.id);

      return {
        ...movie,
        markers: movieMarkers
      }
      
    })

    return response.json(moviesWithMarkers);
  }

}

module.exports = moviesController;