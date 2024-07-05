exports.up = knex => knex.schema.createTable("markers", table => {
  table.text("name");
  table.increments("id");
  table.integer("movie_id").references("id").inTable("movies").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("markers");