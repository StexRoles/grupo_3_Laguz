module.exports = (sequelize, DataTypes) => {
    let alias = "Countries";
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
        tableName: "countries",
        timestamps: false
    };

    const Country = sequelize.define(alias, cols, config);

    Country.associate = function(models) {
        Country.hasMany(models.Users, {
            as: "users",
            foreignKey: "country_id"
        });
        
        Country.hasMany(models.Cities, {
            as: "cities",
            foreignKey: "country_id"
        });
    };

    return Country;
}