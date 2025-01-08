import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Movie } from "./Movie";
import { User } from "./User";

export const MovieActor = sequelize.define(
    "movie_actor",
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
        },
        movie_id: {
            type: DataTypes.INTEGER,
            references: { model: Movie, key: "id" },
        },
    },
    {
        underscored: true
    }
);

User.belongsToMany(Movie, { as: 'actors', through: MovieActor });
Movie.belongsToMany(User, { as: 'actors', through: MovieActor });