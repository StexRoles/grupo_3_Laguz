module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";
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
        tableName: "categories",
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.belongsToMany(models.Products, {
            as: "products",
            through: "product_category",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: false
        });
    };

    return Category;
}