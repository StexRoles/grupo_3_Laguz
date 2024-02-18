module.exports = (sequelize, DataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Brands, {
            as: "brands",
            foreignKey: "brand_id"
        });

        Product.belongsTo(models.Status, {
            as: "status",
            foreignKey: "status_id"
        });

        Product.belongsToMany(models.Categories, {
            as: "categories",
            through: "product_category",
            foreignKey: "product_id", 
            otherKey: "category_id",
            timestamps: false
        });
    };

    return Product;
}