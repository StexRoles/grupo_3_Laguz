module.exports = (sequelize, DataTypes) => {
    let alias = "Product_Category";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "product_category",
        timestamps: false
    };

    const Product_Category = sequelize.define(alias, cols, config);

    return Product_Category;
}