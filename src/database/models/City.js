module.exports = (sequelize, DataTypes) => {
    let alias = "Cities";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "cities",
        timestamps: false
    };

    const City = sequelize.define(alias, cols, config);

    City.associate = function(models) {
        City.belongsTo(models.Countries, {
            as: "countries",
            foreignKey: "country_id"
        });
    };

    return City;
}