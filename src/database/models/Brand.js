module.exports = (sequelize, DataTypes) => {
    let alias = "Brands";
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
        tableName: "brands", 
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models) {
        Brand.hasMany(models.Products, {
            as: "products",
            foreignKey: "brand_id"
        }); 
    };

    return Brand;
}