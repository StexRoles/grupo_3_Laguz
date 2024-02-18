module.exports = (sequelize, DataTypes) => {
    let alias = "Status";
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
        tableName: "status",
        timestamps: false
    };

    const Status = sequelize.define(alias, cols, config);

    Status.associate = function(models) {
        Status.hasMany(models.Products, {
            as: "products",
            foreignKey: "status_id"
        }); 
    };

    return Status;
}