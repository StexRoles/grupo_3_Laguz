module.exports = (sequelize, DataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.INTEGER
        },
        nickname: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Countries, {
            as: "countries",
            foreignKey: "country_id"
        });
    };

    return User;
}