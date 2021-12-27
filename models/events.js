const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Events = sequelize.define("Events", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    startDate:{ 
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull:true,
    },
    startTime:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    endTime:{
        type: DataTypes.TIME,
        allowNull: true,
    },
    createdBy:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


Events.indexes = [
    {
        unique: true,
        fields: ['userId']
    },
]


module.exports = Events;
