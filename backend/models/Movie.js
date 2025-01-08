import { User } from './User';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

export const Movie = sequelize.define(
    'movie',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        plot: { type: DataTypes.TEXT, allowNull: true },
        poster: { type: DataTypes.TEXT, allowNull: true },
        release_date: { type: DataTypes.DATE, allowNull: false },
        producer_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
    },
    {
        underscored: true
    }
);

Movie.belongsTo(User, { as: 'producer', foreignKey: "producer_id" });