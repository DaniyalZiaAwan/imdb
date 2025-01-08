import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { USER_TYPE } from "../utils/enums";

export const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        type: { type: DataTypes.ENUM(USER_TYPE.USER, USER_TYPE.ACTOR, USER_TYPE.PRODUCER), allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        bio: { type: DataTypes.TEXT, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATE, allowNull: false }
    },
    {
        underscored: true
    }
);